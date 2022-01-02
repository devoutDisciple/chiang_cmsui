import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Row, InputNumber, Upload, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import * as action from './redux/action';
import styles from './index.less';

const FormItem = Form.Item;
const formLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 19 },
};
export default ({ controllerDialog, onSearch, status, editData }) => {
	const [form] = Form.useForm();

	const [state, setState] = useState({
		title: '新增模块',
		satus: 'new',
	});

	const dispatch = useDispatch();

	const { validateFields } = form;

	useEffect(() => {
		if (status === 'new') {
			setState({ title: '新增模块', satus: 'new' });
		} else {
			setState({ title: '编辑', satus: 'edit' });
		}
	}, [editData.name, editData.url, status]);

	const handleOk = async () => {
		const values = await validateFields(['name', 'sort', 'file']);
		let filename = '';
		if (status === 'edit' && !values.file) {
			filename = '';
		} else {
			const file = values.file.fileList[0];
			if (!file) return message.warning('请上传图片');
			const { response } = file.xhr;
			filename = JSON.parse(response).data;
		}

		if (status === 'new') {
			dispatch(
				action.addPlateFunc({ name: values.name, sort: values.sort, filename }, onSearch, controllerDialog),
			);
		} else {
			dispatch(
				action.editPlateFunc(
					{ id: editData.id, name: values.name, sort: values.sort, filename },
					onSearch,
					controllerDialog,
				),
			);
		}
	};

	const handleCancel = controllerDialog;

	let defaultFileList = [];
	if (status === 'edit') {
		defaultFileList = [{ uid: '-1', name: editData.name, url: editData.url, thumbUrl: editData.url }];
	}

	return (
		<Modal className={styles.dialog} title={state.title} visible onOk={handleOk} onCancel={handleCancel}>
			<Form
				form={form}
				{...formLayout}
				layout="inline"
				initialValues={status === 'new' ? {} : { name: editData.name, sort: editData.sort }}
			>
				<Row className={styles.form_row}>
					<FormItem name="name" label="模块名称" rules={[{ required: true }]}>
						<Input placeholder="请输入" />
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem name="sort" label="权重" rules={[{ required: true }]}>
						<InputNumber min={1} placeholder="请输入" />
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem name="file" label="图片">
						<Upload
							defaultFileList={defaultFileList}
							maxCount={1}
							name="file"
							action="/plate/upload"
							listType="picture"
							accept=".png,.jpg,.jpeg"
						>
							<Button icon={<UploadOutlined />}>点击上传</Button>
						</Upload>
					</FormItem>
				</Row>
			</Form>
		</Modal>
	);
};

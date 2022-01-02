import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Row, InputNumber, message } from 'antd';
import request from '@utils/AxiosRequest';
import styles from './index.less';

const FormItem = Form.Item;
const formLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 19 },
};
export default ({ controllerDialog, onSearch, status, editData = {} }) => {
	const [form] = Form.useForm();

	const [state, setState] = useState({
		title: '新增省份',
		satus: 'new',
	});
	const { validateFields } = form;

	useEffect(() => {
		if (status === 'new') {
			setState({ title: '新增模块', satus: 'new' });
		} else {
			setState({ title: '编辑', satus: 'edit' });
		}
	}, [editData.name, editData.url, status]);

	const handleOk = async () => {
		const values = await validateFields(['name', 'province', 'sort']);
		request
			.post('/address/addProvince', {
				name: values.name,
				sort: values.sort,
				parentId: -1,
				type: 1,
			})
			.then(() => {
				message.success('新增成功');
				onSearch();
				controllerDialog();
			});
	};

	const handleCancel = controllerDialog;

	return (
		<Modal className={styles.dialog} title={state.title} visible onOk={handleOk} onCancel={handleCancel}>
			<Form
				form={form}
				{...formLayout}
				layout="inline"
				initialValues={status === 'new' ? {} : { name: editData.name, sort: editData.sort }}
			>
				<Row className={styles.form_row}>
					<FormItem name="name" label="省份" rules={[{ required: true }]}>
						<Input placeholder="请输入" />
					</FormItem>
				</Row>
				{/* <Row className={styles.form_row}>
					<FormItem name="province" label="省" rules={[{ required: true }]}>
						<Input placeholder="请输入" />
					</FormItem>
				</Row> */}
				<Row className={styles.form_row}>
					<FormItem name="sort" label="权重" rules={[{ required: true }]}>
						<InputNumber min={1} placeholder="请输入" />
					</FormItem>
				</Row>
			</Form>
		</Modal>
	);
};

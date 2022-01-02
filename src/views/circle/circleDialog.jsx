import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Row, Button, Upload, Cascader, message, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import * as action from './redux/action';
import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;
const formLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 19 },
};
export default ({ controllerDialog, onSearch, status, editData }) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { plateList, addressList } = useSelector((state) => state.circle);
	const { validateFields, setFieldsValue } = form;

	const [state, setState] = useState({
		title: '新增模块',
		satus: 'new',
	});

	const [circleType, setCircleType] = useState(1);
	const [selectAddress, setSelectAddress] = useState(1);

	useEffect(() => {
		if (status === 'new') {
			setState({ title: '新增圈子', satus: 'new' });
			setFieldsValue({ type: circleType });
		} else {
			setCircleType(editData.type);
			setState({ title: '编辑圈子', satus: 'edit' });
			setFieldsValue({
				name: editData.name,
				plate_id: editData.plate_id,
				address: [editData.province, editData.city, editData.country],
				type: editData.type,
				desc: editData.desc,
			});
		}
	}, [circleType, editData, setFieldsValue, status]);

	const handleOk = async () => {
		const values = await validateFields(['name', 'plate_id', 'type', 'address', 'desc', 'logo', 'bgImg']);
		let logoFilename = '';
		let bgFilename = '';
		if (status === 'edit' && !values.logo) {
			logoFilename = '';
		} else {
			const logoFile = values.logo.fileList[0];
			if (!logoFile) return message.warning('请上传图片');
			logoFilename = JSON.parse(logoFile.xhr.response).data;
		}
		if (status === 'edit' && !values.bgImg) {
			bgFilename = '';
		} else {
			const bgFile = values.bgImg.fileList[0];
			if (!bgFile) return message.warning('请上传图片');
			bgFilename = JSON.parse(bgFile.xhr.response).data;
		}
		let { province, city, country } = editData;
		if (Array.isArray(selectAddress)) {
			[province, city, country] = selectAddress;
		}
		const postData = {
			name: values.name,
			plate_id: values.plate_id,
			type: values.type,
			province,
			city,
			country,
			desc: values.desc,
			logo: logoFilename,
			bg_url: bgFilename,
		};
		if (status === 'new') {
			dispatch(action.addCircleFunc(postData, onSearch, controllerDialog));
		} else {
			postData.id = editData.id;
			dispatch(action.editCircleFunc(postData, onSearch, controllerDialog));
		}
	};

	const handleCancel = controllerDialog;

	let logoDefaultFileList = [];
	let bgDefaultFileList = [];
	if (status === 'edit') {
		logoDefaultFileList = [{ uid: '-1', name: editData.name, url: editData.logo, thumbUrl: editData.logo }];
		bgDefaultFileList = [{ uid: '-2', name: editData.name, url: editData.bg_url, thumbUrl: editData.bg_url }];
	}

	return (
		<Modal className={styles.dialog} title={state.title} visible onOk={handleOk} onCancel={handleCancel}>
			<Form form={form} {...formLayout} layout="inline">
				<Row className={styles.form_row}>
					<FormItem name="name" label="圈子名称" rules={[{ required: true }]}>
						<Input placeholder="请输入" />
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem name="plate_id" label="所属模块" rules={[{ required: true }]}>
						<Select style={{ width: '100%' }} placeholder="请选择">
							{plateList && plateList.map((item) => <Option value={item.id}>{item.name}</Option>)}
						</Select>
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem name="type" label="圈子类型" rules={[{ required: true }]}>
						<Select style={{ width: '100%' }} onChange={(val) => setCircleType(val)} placeholder="请选择">
							<Option value={1}>学校圈子</Option>
							<Option value={2}>其他圈子</Option>
						</Select>
					</FormItem>
				</Row>
				{circleType === 1 && (
					<Row className={styles.form_row}>
						<FormItem name="address" label="地址" rules={[{ required: true }]}>
							<Cascader
								options={addressList}
								onChange={(keys, val) => {
									const area = [];
									val.forEach((item) => area.push(item.label));
									setSelectAddress(area);
								}}
								placeholder="请选择"
							/>
						</FormItem>
					</Row>
				)}
				<Row className={styles.form_row}>
					<FormItem name="desc" label="描述信息" rules={[{ required: true }]}>
						<Input placeholder="请输入" />
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem name="logo" label="logo">
						<Upload
							defaultFileList={logoDefaultFileList}
							maxCount={1}
							name="file"
							action="/circle/upload"
							listType="picture"
							accept=".png,.jpg,.jpeg"
						>
							<Button icon={<UploadOutlined />}>点击上传</Button>
						</Upload>
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem name="bgImg" label="背景图">
						<Upload
							defaultFileList={bgDefaultFileList}
							maxCount={1}
							name="file"
							action="/circle/upload"
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

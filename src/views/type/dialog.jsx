import React from 'react';
import { Modal, Form, Row, InputNumber, Input } from 'antd';
import { useDispatch } from 'react-redux';
import * as action from './redux/action';
import styles from './index.less';

const FormItem = Form.Item;
const formLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 19 },
};
export default ({ controllerDialog, onSearch, typeid }) => {
	const [form] = Form.useForm();

	const dispatch = useDispatch();

	const { validateFields } = form;

	const handleOk = async () => {
		const values = await validateFields(['name', 'sort']);
		values.typeid = typeid;
		dispatch(action.addProjectFunc(values, onSearch, controllerDialog));
	};

	const handleCancel = controllerDialog;
	return (
		<Modal className={styles.dialog} title="新增" visible onOk={handleOk} onCancel={handleCancel}>
			<Form form={form} {...formLayout} layout="inline" initialValues={{}}>
				<Row className={styles.form_row}>
					<FormItem name="name" label="课程类别" rules={[{ required: true }]}>
						<Input placeholder="请输入" />
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem name="sort" label="权重" rules={[{ required: true }]}>
						<InputNumber min={1} placeholder="请输入" />
					</FormItem>
				</Row>
			</Form>
		</Modal>
	);
};

import React from 'react';
import { Modal, Form, Input, Row } from 'antd';
import { useDispatch } from 'react-redux';
import request from '@utils/AxiosRequest';
import * as action from './redux/action';
import styles from './index.less';

const FormItem = Form.Item;

const formLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 },
};
export default ({ circleId, controllerDialog }) => {
	const [form] = Form.useForm();
	const { validateFields } = form;
	const dispatch = useDispatch();

	const handleOk = async () => {
		const values = await validateFields(['topicName']);
		request.post('/topic/add', { circleId, topicName: values.topicName });
		dispatch(action.onSearchTopics({ circle_id: circleId }));
		controllerDialog();
	};

	const handleCancel = () => {
		controllerDialog();
	};

	return (
		<Modal className={styles.dialog} title="新增话题" visible onOk={handleOk} onCancel={handleCancel}>
			<Form form={form} {...formLayout} layout="inline">
				<Row className={styles.form_row}>
					<FormItem name="topicName" label="话题名称" rules={[{ required: true }]}>
						<Input placeholder="请输入" />
					</FormItem>
				</Row>
			</Form>
		</Modal>
	);
};

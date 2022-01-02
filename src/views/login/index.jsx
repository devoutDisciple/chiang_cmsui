import React from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as action from '@store/global/action';
import styles from './index.less';

const FormItem = Form.Item;

const formLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 },
};

export default () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const history = useHistory();

	const { validateFields } = form;

	const submit = async () => {
		try {
			const values = await validateFields(['account', 'password']);
			dispatch(action.loginFunc(values, history));
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className={styles.login}>
			<div className={styles.login_form}>
				<Form form={form} {...formLayout}>
					<FormItem name="account" label="账号" rules={[{ required: true, message: '请输入' }]}>
						<Input placeholder="请输入" />
					</FormItem>
					<FormItem name="password" label="密码" rules={[{ required: true, message: '请输入' }]}>
						<Input type="password" placeholder="请输入" />
					</FormItem>
					<div className={styles.login_btn}>
						<Button onClick={submit} type="primary">
							登录
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

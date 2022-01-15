import React, { useEffect, useCallback } from 'react';
import moment from 'moment';
import { Form, Input, Button, Col, Row, DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import styles from './index.less';
import * as action from './redux/action';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item;
const colLayout = {
	xs: { span: 8 },
	xxl: { span: 6 },
	className: styles.search_col,
};

const formLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 },
};

export default () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { validateFields } = form;

	const submit = useCallback(async () => {
		try {
			const values = await validateFields(['username', 'phone', 'date']);
			dispatch(action.getUsersByPageFunc(values));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch, validateFields]);

	useEffect(() => {
		submit();
	}, [submit]);

	return (
		<Row className={styles.search}>
			<Form
				form={form}
				{...formLayout}
				layout="inline"
				initialValues={{
					date: [moment(moment().subtract(30, 'day'), dateFormat), moment(new Date(), dateFormat)],
				}}
			>
				<Col {...colLayout}>
					<FormItem name="username" label="昵称">
						<Input placeholder="请输入" />
					</FormItem>
				</Col>
				<Col {...colLayout}>
					<FormItem name="phone" label="手机号">
						<Input placeholder="请输入" />
					</FormItem>
				</Col>
				<Col {...colLayout}>
					<FormItem name="date" label="注册日期">
						<RangePicker allowClear={false} format={dateFormat} />
					</FormItem>
				</Col>
				<Col {...colLayout} className={styles.search_btn}>
					<Button onClick={submit} type="primary">
						查询
					</Button>
				</Col>
			</Form>
		</Row>
	);
};

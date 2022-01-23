import React, { useEffect, useCallback } from 'react';
import moment from 'moment';
import { Form, Button, Col, Row, DatePicker } from 'antd';
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
	const { validateFields, setFieldsValue } = form;

	const submit = useCallback(async () => {
		try {
			const values = await validateFields(['time']);
			if (values && values.time) {
				dispatch(action.getOrderByPageFunc(values));
			}
		} catch (error) {
			console.log(error);
		}
	}, [dispatch, validateFields]);

	useEffect(() => {
		// 查询
		submit();
		setFieldsValue({
			time: [moment(moment().subtract(7, 'days'), dateFormat), moment(new Date(), dateFormat)],
		});
	}, [dispatch, setFieldsValue, submit]);

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
					<FormItem name="time" label="时间">
						<RangePicker allowClear={false} />
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

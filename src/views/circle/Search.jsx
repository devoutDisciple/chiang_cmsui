import React, { useEffect, useCallback } from 'react';
import moment from 'moment';
import { Form, Input, Button, Col, Row } from 'antd';
import { useDispatch } from 'react-redux';
import styles from './index.less';
import * as action from './redux/action';

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

export default ({ controllerDialog, setModalStatus }) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { validateFields } = form;

	const submit = useCallback(async () => {
		try {
			const values = await validateFields(['name']);
			dispatch(action.getCirclesByPageFunc(values));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch, validateFields]);

	const onClickAdd = () => {
		setModalStatus('new');
		controllerDialog();
	};

	useEffect(() => {
		// 获取所有模块信息
		dispatch(action.getPlateListFunc());
		// 获取地址信息
		dispatch(action.getAddressListFunc());
		// 查询
		submit();
	}, [dispatch, submit]);

	return (
		<Row className={styles.search}>
			<Form
				form={form}
				{...formLayout}
				layout="inline"
				initialValues={{
					date: [moment(moment().subtract(7, 'day'), dateFormat), moment(new Date(), dateFormat)],
				}}
			>
				<Col {...colLayout}>
					<FormItem name="name" label="圈子名称">
						<Input placeholder="请输入" />
					</FormItem>
				</Col>
				<Col {...colLayout} className={styles.search_btn}>
					<Button onClick={submit} type="primary">
						查询
					</Button>
					<Button onClick={onClickAdd} type="primary">
						新增
					</Button>
				</Col>
			</Form>
		</Row>
	);
};

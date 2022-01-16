import React, { useEffect, useCallback } from 'react';
import moment from 'moment';
import { Form, Button, Col, Row, Select } from 'antd';
import { type } from '@constant/constant';
import { useDispatch } from 'react-redux';
import styles from './index.less';
import * as action from './redux/action';

const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item;
const { Option } = Select;
const colLayout = {
	xs: { span: 8 },
	xxl: { span: 6 },
	className: styles.search_col,
};

const formLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 },
};

export default ({ setTypeid, controllerDialog }) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { validateFields, setFieldsValue } = form;

	const submit = useCallback(async () => {
		try {
			const values = await validateFields(['typeid']);
			dispatch(action.getProjectByType(values));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch, validateFields]);

	useEffect(() => {
		setFieldsValue({ typeid: 1 });
		// 查询
		submit();
	}, [dispatch, setFieldsValue, submit]);

	const onClickAdd = () => {
		controllerDialog();
	};

	const onSelect = (data) => {
		setTypeid(data);
		submit();
	};

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
					<FormItem name="typeid" label="项目">
						<Select style={{ width: '100%' }} placeholder="请选择" onSelect={onSelect}>
							{type &&
								type.map((item) => (
									<Option key={item.id} value={item.id}>
										{item.name}
									</Option>
								))}
						</Select>
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

import React, { useEffect, useCallback } from 'react';
import moment from 'moment';
import { Form, Button, Col, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { typeList } from '@constant/constant';
import styles from './index.less';
import * as action from './redux/action';

const { Option } = Select;
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

export default ({ controllerAddDialog }) => {
	const [form] = Form.useForm();
	const { projectList } = useSelector((state) => state.subject);
	const dispatch = useDispatch();
	const { validateFields, setFieldsValue } = form;

	const submit = useCallback(async () => {
		try {
			const values = await validateFields(['type', 'projectid']);
			dispatch(action.getSubjectsByPageFunc(values));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch, validateFields]);

	const getAllTeachers = () => {
		dispatch(action.getAllTeachersFunc());
	};

	useEffect(() => {
		// 查询
		submit();
		// 获取所有老师
		getAllTeachers();
	}, [dispatch, submit]);

	const onSelectType = (data) => {
		dispatch(action.getProjectByType({ typeId: data }));
		setFieldsValue({ projectid: '' });
	};

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
					<FormItem name="type" label="项目">
						<Select style={{ width: '100%' }} placeholder="请选择" allowClear onSelect={onSelectType}>
							{typeList.map((item) => (
								<Option key={item.id} value={item.id}>
									{item.name}
								</Option>
							))}
						</Select>
					</FormItem>
				</Col>
				<Col {...colLayout}>
					<FormItem name="projectid" label="类别">
						<Select style={{ width: '100%' }} placeholder="请选择" allowClear>
							{projectList.map((item) => (
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
					<Button onClick={controllerAddDialog} type="primary">
						新增
					</Button>
				</Col>
			</Form>
		</Row>
	);
};

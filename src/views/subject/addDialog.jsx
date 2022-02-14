import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Row, InputNumber, DatePicker, Select } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { typeList } from '@constant/constant';
import * as action from './redux/action';
import styles from './index.less';

const { RangePicker } = DatePicker;

const { Option } = Select;
const FormItem = Form.Item;
const formLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 },
};
const timeFormat = 'YYYY-MM-DD HH:mm:ss';
const dateFormat = 'YYYY-MM-DD';

export default ({ controllerDialog, onSearch, status, editData }) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { projectListSelect, teacherList } = useSelector((state) => state.subject);
	const { validateFields, setFieldsValue } = form;

	const [state, setState] = useState({
		title: '新增模块',
		satus: 'new',
	});
	useEffect(() => {
		if (status === 'new') {
			setState({ title: '新增课程', satus: 'new' });
			setFieldsValue({
				price: 0,
				apply_price: 0.01,
				cluster_price: 0.01,
				limit_num: 8000,
			});
		} else {
			setState({ title: '编辑课程', satus: 'edit' });
			setFieldsValue({
				type: editData.typeid,
				plate_id: editData.project_id,
				title: editData.title,
				price: editData.price,
				apply_price: editData.apply_price,
				cluster_price: editData.cluster_price,
				limit_num: editData.limit_num,
				teacher_ids: JSON.parse(editData.teacher_ids),
				time: [moment(editData.start_time, dateFormat), moment(editData.end_time, dateFormat)],
			});
			dispatch(action.getProjectByTypeBySelect({ typeId: editData.typeid }));
			setTimeout(() => {
				setFieldsValue({ projectid: editData.project_id });
			}, 1000);
		}
	}, [dispatch, editData, setFieldsValue, status]);

	const selectType = (data) => {
		dispatch(action.getProjectByTypeBySelect({ typeId: data }));
		setFieldsValue({ projectid: '' });
	};

	const handleOk = async () => {
		const values = await validateFields([
			'type',
			'projectid',
			'title',
			'price',
			'apply_price',
			'cluster_price',
			'limit_num',
			'teacher_ids',
			'time',
		]);
		values.start_time = moment(values.time[0]).format(timeFormat);
		values.end_time = moment(values.time[1]).format(timeFormat);
		delete values.time;
		if (status === 'new') {
			dispatch(action.addSubjectFunc(values, onSearch, controllerDialog));
		} else {
			values.id = editData.id;
			dispatch(action.eidtSubjectFunc(values, onSearch, controllerDialog));
		}
	};

	return (
		<Modal
			width="800px"
			className={styles.dialog}
			title={state.title}
			visible
			onOk={handleOk}
			onCancel={controllerDialog}
		>
			<Form form={form} {...formLayout} layout="inline">
				<Row className={styles.form_row}>
					<FormItem name="type" label="所属项目" rules={[{ required: true }]}>
						<Select style={{ width: '100%' }} onChange={(val) => selectType(val)} placeholder="请选择">
							{typeList.map((item) => (
								<Option key={item.id} value={item.id}>
									{item.name}
								</Option>
							))}
						</Select>
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem name="projectid" label="课程类别" rules={[{ required: true }]}>
						<Select style={{ width: '100%' }} placeholder="请选择">
							{projectListSelect.map((item) => (
								<Option key={item.id} value={item.id}>
									{item.name}
								</Option>
							))}
						</Select>
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem name="title" label="标题" rules={[{ required: true }]}>
						<Input placeholder="请输入(50字以内)" maxLength={50} />
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem name="price" label="总价" rules={[{ required: true }]}>
						<InputNumber min={0} defaultValue={0} />
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem name="teacher_ids" label="选择老师" rules={[{ required: true }]}>
						<Select
							mode="multiple"
							style={{ width: '100%' }}
							placeholder="选择老师"
							optionLabelProp="label"
						>
							{teacherList &&
								teacherList.map((item) => (
									<Option value={item.id} label={item.name}>
										<div className={styles.teacherItem}>
											<img src={item.photo} alt="加载中" />
											{item.name}
										</div>
									</Option>
								))}
						</Select>
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem name="apply_price" label="报名价格" rules={[{ required: true }]}>
						<InputNumber min={0.01} defaultValue={0.01} />
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem name="cluster_price" label="组团价格" rules={[{ required: true }]}>
						<InputNumber min={0.01} defaultValue={0.01} />
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem name="limit_num" label="限制参与人数" rules={[{ required: true }]}>
						<InputNumber min={0} defaultValue={8000} />
					</FormItem>
				</Row>
				<Row className={styles.form_row}>
					<FormItem name="time" label="课程周期" rules={[{ required: true }]}>
						<RangePicker />
					</FormItem>
				</Row>
			</Form>
		</Modal>
	);
};

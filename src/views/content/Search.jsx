import React, { useEffect, useCallback } from 'react';
import moment from 'moment';
import { Form, Button, Input, Col, Row, Select, DatePicker } from 'antd';
import { CONTENT_TYPE } from '@utils/const';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.less';
import * as action from './redux/action';

const { RangePicker } = DatePicker;
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

export default () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { circles } = useSelector((state) => state.content);
	const { validateFields } = form;

	const submit = useCallback(async () => {
		try {
			const values = await validateFields(['circle', 'type', 'sort', 'date', 'username']);
			dispatch(action.getContentsByPageFunc(values));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch, validateFields]);

	useEffect(() => {
		// 获取所有模块信息
		dispatch(action.getCirclesAll());
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
					date: [moment(moment().subtract(30, 'day'), dateFormat), moment(new Date(), dateFormat)],
				}}
			>
				<Col {...colLayout}>
					<FormItem name="circle" label="圈子">
						<Select style={{ width: '100%' }} placeholder="请选择" allowClear>
							{circles.map((item) => (
								<Option key={item.name} value={item.name}>
									{item.name}
								</Option>
							))}
						</Select>
					</FormItem>
				</Col>
				<Col {...colLayout}>
					<FormItem name="type" label="类型">
						<Select style={{ width: '100%' }} placeholder="请选择" allowClear>
							{CONTENT_TYPE.map((item) => (
								<Option key={item.num} value={item.num}>
									{item.label}
								</Option>
							))}
						</Select>
					</FormItem>
				</Col>
				<Col {...colLayout}>
					<FormItem name="sort" label="排序">
						<Select style={{ width: '100%' }} placeholder="请选择" allowClear>
							<Option value="goods">点赞</Option>
							<Option value="comment">评论</Option>
							<Option value="share">转发</Option>
							<Option value="hot">热度</Option>
						</Select>
					</FormItem>
				</Col>
				<Col {...colLayout}>
					<FormItem name="date" label="发布时间">
						<RangePicker allowClear={false} format={dateFormat} />
					</FormItem>
				</Col>
				<Col {...colLayout}>
					<FormItem name="username" label="用户">
						<Input placeholder="请输入" />
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

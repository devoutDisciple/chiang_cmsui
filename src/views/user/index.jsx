import React, { useEffect } from 'react';
import { Spin, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Search from './Search';
import './redux/reducer';
import * as action from './redux/action';
import styles from './index.less';

export default () => {
	const {
		data: { count, list },
		condition: { current },
		loading,
	} = useSelector((state) => state.member);
	const dispatch = useDispatch();

	useEffect(() => {});

	const columns = [
		{
			title: '头像',
			dataIndex: 'photo',
			key: 'photo',
			render: (txt) => <img className={styles.user_photo} alt="加载失败" src={txt} />,
		},
		{
			title: '昵称',
			dataIndex: 'username',
			key: 'username',
		},
		{
			title: '手机号',
			dataIndex: 'phone',
			key: 'phone',
		},

		{
			title: '注册时间',
			dataIndex: 'create_time',
			key: 'create_time',
		},
		// {
		// 	title: '操作',
		// 	dataIndex: 'operation',
		// 	key: 'operation',
		// 	render: () => (
		// 		<>
		// 			{/* <Button onClick={() => {}} type="link">
		// 				支付记录
		// 			</Button>
		// 			<Button onClick={() => {}} type="link">
		// 				报名课程
		// 			</Button>
		// 			<Button onClick={() => {}} type="link">
		// 				组团课程
		// 			</Button> */}
		// 		</>
		// 	),
		// },
	];

	const pageChange = (page) => {
		dispatch(action.getUsersByPageFunc({ current: page }));
	};

	return (
		<div className={styles.wrap}>
			<Spin spinning={loading}>
				<Search />
				<div className={styles.table}>
					<Table
						rowKey="id"
						dataSource={list}
						columns={columns}
						pagination={{
							current,
							total: count,
							pageSize: 10,
							showTotal: (total) => `共 ${total} 条`,
							onChange: pageChange,
						}}
					/>
				</div>
			</Spin>
		</div>
	);
};

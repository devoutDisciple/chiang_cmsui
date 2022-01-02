import React from 'react';
import { Spin, Table, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { filterIdentity } from '@utils/filter';
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
			title: '认证',
			dataIndex: 'identity',
			key: 'identity',
			render: (txt) => <span>{filterIdentity(txt)}</span>,
		},
		{
			title: '性别',
			dataIndex: 'sex',
			key: 'sex',
			render: (txt) => <span>{txt === 1 ? '男' : '女'}</span>,
		},
		{
			title: '地址',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: '学校',
			dataIndex: 'school',
			key: 'school',
		},
		{
			title: '年级',
			dataIndex: 'level',
			key: 'level',
		},
		{
			title: '点赞数量',
			dataIndex: 'goods',
			key: 'goods',
		},
		{
			title: '粉丝数量',
			dataIndex: 'fans',
			key: 'fans',
		},
		{
			title: '关注人数',
			dataIndex: 'publish',
			key: 'publish',
		},
		{
			title: '积分',
			dataIndex: 'integral',
			key: 'integral',
		},
		{
			title: '注册时间',
			dataIndex: 'create_time',
			key: 'create_time',
		},
		{
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
			render: (txt, record) => (
				<>
					<Button onClick={() => {}} type="link">
						评论记录
					</Button>
					<Button onClick={() => {}} type="link">
						点赞记录
					</Button>
					<Button onClick={() => {}} type="link">
						发布记录
					</Button>
				</>
			),
		},
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

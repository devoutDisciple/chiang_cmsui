import React, { useState } from 'react';
import { Spin, Table } from 'antd';
import { typeList, filterEnglish, filterMath } from '@constant/constant';
import { useSelector, useDispatch } from 'react-redux';
import Search from './Search';
import './redux/reducer';
import * as action from './redux/action';
import Dialog from './dialog';
import styles from './index.less';

export default () => {
	const {
		data: { count, list },
		condition: { current },
		loading,
	} = useSelector((state) => state.order);
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);

	const onSearch = () => {
		dispatch(action.getOrderByPageFunc({}));
	};

	const controllerDialog = () => setVisible(!visible);

	const columns = [
		{
			title: '用户微信名称',
			dataIndex: 'username',
			key: 'username',
			render: (txt, record) => <span>{record.userDetail.username}</span>,
		},
		{
			title: '微信头像',
			dataIndex: 'userPhoto',
			key: 'userPhoto',
			render: (txt, record) => <img alt="加载失败" className={styles.table_img} src={record.userDetail.photo} />,
		},
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '性别',
			dataIndex: 'sex',
			key: 'sex',
			render: (txt) => <span>{txt === 1 ? '男' : '女'}</span>,
		},
		{
			title: '英语',
			dataIndex: 'english',
			key: 'english',
			render: (txt) => <span>{filterEnglish(txt)}</span>,
		},
		{
			title: '数学',
			dataIndex: 'math',
			key: 'math',
			render: (txt) => <span>{filterMath(txt)}</span>,
		},

		{
			title: '手机号',
			dataIndex: 'phone',
			key: 'phone',
			render: (txt, record) => <span>{record.userDetail.phone}</span>,
		},
		{
			title: '项目名称',
			dataIndex: 'aaa',
			key: 'aaa',
			render: (txt, record) => (
				<span>{typeList.filter((item) => item.id === record.projectDetail.type_id)[0].name}</span>
			),
		},
		{
			title: '报名类别',
			dataIndex: 'project',
			key: 'project',
			render: (txt, record) => <span>{record.projectDetail.name}</span>,
		},
		{
			title: '所属科目',
			dataIndex: 'subject',
			key: 'subject',
			render: (txt, record) => <span>{record.subjectDetail.title}</span>,
		},
		{
			title: '拼团/报名',
			dataIndex: 'type',
			key: 'sign',
			render: (txt, record) => {
				let teamState = '';
				if (record.teamDetail) {
					teamState = record.teamDetail.teamState;
				}
				return <span>{Number(txt) === 1 ? '报名' : `组团(${teamState})`}</span>;
			},
		},
		{
			title: '拼团人数',
			dataIndex: 'team',
			key: 'team',
			render: (txt, record) => <span>{record.type === 2 ? record.teamDetail.num : 0}</span>,
		},
		{
			title: '入学时间',
			dataIndex: 'time',
			key: 'time',
		},
		{
			title: '创建时间',
			dataIndex: 'create_time',
			key: 'create_time',
		},
	];
	const pageChange = (page) => {
		dispatch(action.getOrderByPageFunc({ current: page }));
	};

	return (
		<div className={styles.wrap}>
			<Spin spinning={loading}>
				<Search controllerDialog={controllerDialog} />
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
			{visible && <Dialog onSearch={onSearch} controllerDialog={controllerDialog} />}
		</div>
	);
};

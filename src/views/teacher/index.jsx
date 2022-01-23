import React, { useState } from 'react';
import { Spin, Table, Button, Popconfirm } from 'antd';
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
	} = useSelector((state) => state.teacher);
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);

	const onSearch = () => {
		dispatch(action.getAllTeacherFunc({}));
	};

	const controllerDialog = () => setVisible(!visible);

	// 删除轮播图
	const deleteRecord = (record) => {
		dispatch(action.deleteTeacherByIdFunc({ id: record.id }, onSearch));
	};

	const columns = [
		{
			title: '名字',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '头像',
			dataIndex: 'photo',
			key: 'photo',
			render: (txt) => <img alt="加载失败" className={styles.table_img} src={txt} />,
		},
		{
			title: '创建时间',
			dataIndex: 'create_time',
			key: 'create_time',
		},
		{
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
			render: (txt, record) => (
				<span>
					<Popconfirm
						placement="top"
						title="是否确认删除"
						onConfirm={() => deleteRecord(record)}
						okText="确定"
						cancelText="取消"
					>
						<Button type="link">删除</Button>
					</Popconfirm>
				</span>
			),
		},
	];
	const pageChange = (page) => {
		dispatch(action.getAllTeacherFunc({ current: page }));
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

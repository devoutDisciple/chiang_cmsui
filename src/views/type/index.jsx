import React, { useState } from 'react';
import { Spin, Table, Popconfirm, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Search from './Search';
import Dialog from './dialog';
import './redux/reducer';
import * as action from './redux/action';
import styles from './index.less';

export default () => {
	const {
		data: { count, list },
		condition: { current },
		loading,
	} = useSelector((state) => state.feedback);
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);
	const [typeid, setTypeid] = useState(1);

	const controllerDialog = () => setVisible(!visible);

	const onSearch = () => {
		dispatch(action.getProjectByType({}));
	};

	const deleteRecord = (record) => {
		console.log(record, 11);
		dispatch(action.deleteRecordFunc({ id: record.id }, onSearch));
	};

	const pageChange = (page) => {
		dispatch(action.getProjectByType({ current: page }));
	};

	const columns = [
		{
			title: '课程类别',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '权重',
			dataIndex: 'sort',
			key: 'sort',
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
	return (
		<div className={styles.wrap}>
			<Spin spinning={loading}>
				<Search controllerDialog={controllerDialog} setTypeid={setTypeid} />
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
			{visible && <Dialog typeid={typeid} onSearch={onSearch} controllerDialog={controllerDialog} />}
		</div>
	);
};

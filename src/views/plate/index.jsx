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
	} = useSelector((state) => state.plate);
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);
	const [editData, setEditData] = useState({});
	const [modalStatus, setModalStatus] = useState('new');

	const onSearch = () => {
		dispatch(action.getPlatesByPageFunc({}));
	};

	const controllerDialog = () => setVisible(!visible);

	// 删除模块
	const deleteRecord = (record) => {
		dispatch(action.deletePlateByIdFunc({ plate_id: record.id }, onSearch));
	};

	const editRecord = (record) => {
		console.log(record);
		setEditData(record);
		setModalStatus('edit');
		controllerDialog();
	};

	const columns = [
		{
			title: '模块名称',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '模块图片',
			dataIndex: 'url',
			key: 'url',
			render: (txt) => <img alt="加载失败" className={styles.table_img} src={txt} />,
		},
		{
			title: '权重',
			dataIndex: 'sort',
			key: 'sort',
		},
		{
			title: '热度',
			dataIndex: 'hot',
			key: 'hot',
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

					<Button onClick={() => editRecord(record)} type="link">
						编辑
					</Button>
				</span>
			),
		},
	];
	const pageChange = (page) => {
		dispatch(action.getPlatesByPageFunc({ current: page }));
	};

	return (
		<div className={styles.wrap}>
			<Spin spinning={loading}>
				<Search controllerDialog={controllerDialog} setModalStatus={setModalStatus} />
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
			{visible && (
				<Dialog
					onSearch={onSearch}
					editData={editData}
					status={modalStatus}
					controllerDialog={controllerDialog}
				/>
			)}
		</div>
	);
};

import React, { useState } from 'react';
import { Spin, Table, Button, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Search from './Search';
import './redux/reducer';
import * as action from './redux/action';
import Dialog from './circleDialog';
import TopicDetailDialog from './topicDetailDialog';
import styles from './index.less';

export default () => {
	const {
		data: { count, list },
		condition: { current },
		plateList,
		loading,
	} = useSelector((state) => state.circle);
	const dispatch = useDispatch();
	const [circleEditData, setCircleEditData] = useState({});
	const [circleVisible, setCircleVisible] = useState(false);
	const [circlemodalStatus, setCircleModalStatus] = useState('new');
	const [topicDialogVisible, setTopicDialogVisible] = useState(false);
	const [circleId, setCircleId] = useState('');
	const onSearch = () => {
		dispatch(action.getCirclesByPageFunc({}));
	};

	const controllerCircleDialog = () => setCircleVisible(!circleVisible);

	// 删除模块
	const deleteRecord = (record) => {
		dispatch(action.deleteCircleFunc({ circle_id: record.id }, onSearch));
	};

	// 编辑
	const editRecord = (record) => {
		setCircleEditData(record);
		setCircleModalStatus('edit');
		controllerCircleDialog();
	};

	const controllerTopicDetailDialog = () => {
		setTopicDialogVisible(!topicDialogVisible);
	};

	// 查看标签
	const onSearchTag = (record) => {
		setCircleId(record.id);
		controllerTopicDetailDialog();
	};

	const columns = [
		{
			title: '圈子名称',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'logo',
			dataIndex: 'logo',
			key: 'logo',
			render: (txt) => <img className={styles.logo_img} alt="加载失败" src={txt} />,
		},
		{
			title: '背景图',
			dataIndex: 'bg_url',
			key: 'bg_url',
			render: (txt) => <img className={styles.bg_img} alt="加载失败" src={txt} />,
		},
		{
			title: '所属模块',
			dataIndex: 'plate_id',
			key: 'plate_id',
			render: (txt) => <span>{plateList.filter((item) => item.id === txt)[0]?.name}</span>,
		},

		{
			title: '关注人数',
			dataIndex: 'fellow',
			key: 'fellow',
		},
		{
			title: '内容',
			dataIndex: 'contentNum',
			key: 'contentNum',
		},
		{
			title: '类型',
			dataIndex: 'type',
			key: 'type',
			render: (txt) => <span>{txt === 1 ? '学校圈子' : '普通圈子'}</span>,
		},
		{
			title: '地区',
			dataIndex: 'address',
			key: 'address',
			render: (txt, record) => {
				if (record.type === 1) return <span>{`${record.province} ${record.city} ${record.country}`}</span>;
				return <span>--</span>;
			},
		},
		{
			title: '热度',
			dataIndex: 'hot',
			key: 'hot',
		},
		{
			title: '描述信息',
			dataIndex: 'desc',
			key: 'desc',
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
					<Button onClick={() => onSearchTag(record)} type="link">
						话题操作
					</Button>
				</span>
			),
		},
	];

	const pageChange = (page) => {
		dispatch(action.getCirclesByPageFunc({ current: page }));
	};

	return (
		<div className={styles.wrap}>
			<Spin spinning={loading}>
				<Search controllerDialog={controllerCircleDialog} setModalStatus={setCircleModalStatus} />
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
			{circleVisible && (
				<Dialog
					onSearch={onSearch}
					editData={circleEditData}
					status={circlemodalStatus}
					controllerDialog={controllerCircleDialog}
				/>
			)}
			{topicDialogVisible && (
				<TopicDetailDialog circleId={circleId} controllerDialog={controllerTopicDetailDialog} />
			)}
		</div>
	);
};

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Spin, Table, Button, Popconfirm, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
// import { filterContentTypeByTxt } from '@utils/filter';
import request from '@utils/AxiosRequest';
import DetailDialog from './detailDialog';
import AddDialog from './addDialog';
import Search from './Search';
import './redux/reducer';
import * as action from './redux/action';
import styles from './index.less';

export default () => {
	const {
		data: { count, list },
		condition: { current },
		loading,
	} = useSelector((state) => state.subject);
	const dispatch = useDispatch();
	const [detailId, setDetailId] = useState('');
	const [editData, setEditData] = useState({});
	const [addDialogVisible, setAddDialogVisible] = useState(true);
	const [detailDialogVisible, setDetailDialogVisible] = useState(false);

	const onSearch = () => {
		dispatch(action.getSubjectsByPageFunc({}));
	};

	// 删除内容
	const deleteRecord = (record) => {
		request.post('/subject/deleteById', { subjectId: record.id }).then(() => {
			message.success('删除成功');
			onSearch();
		});
	};

	const controllerDetailDialog = () => setDetailDialogVisible(!detailDialogVisible);

	const modifyFile = (data) => {
		const result = [];
		if (data && Array.isArray(data)) {
			data.forEach((item) => {
				const uuid = item.split('subject/')[1];
				result.push({
					uid: uuid,
					name: uuid,
					status: 'done',
					url: item,
				});
			});
		}
		return result;
	};

	const onSearchDetail = async (id) => {
		// const res = await request.get('/subject/detailById', { id: detailId });
		const res = await request.get('/subject/detailById', { id });
		const { detail_urls, signup_urls, teacher_urls, url } = res.data;
		if (url) {
			res.data.url = [
				{
					uid: '-1',
					name: 'image.png',
					status: 'done',
					url,
				},
			];
		}
		res.data.detail_urls = modifyFile(detail_urls);
		res.data.signup_urls = modifyFile(signup_urls);
		res.data.teacher_urls = modifyFile(teacher_urls);
		setEditData(res.data);
		setTimeout(() => {
			controllerDetailDialog();
		}, 100);
	};

	const onClickDetail = (record) => {
		setDetailId(record.id);
		onSearchDetail(record.id);
	};

	const controllerAddDialog = () => {
		setAddDialogVisible(!addDialogVisible);
	};

	const columns = [
		{
			title: '所属项目',
			dataIndex: 'typeName',
			key: 'typeName',
		},
		{
			title: '课程类别',
			dataIndex: 'projectName',
			key: 'projectName',
		},
		{
			title: '标题',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: '总价(元)',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: '报名价格（元）',
			dataIndex: 'apply_price',
			key: 'apply_price',
		},
		{
			title: '组团价格（元）',
			dataIndex: 'cluster_price',
			key: 'cluster_price',
		},
		{
			title: '总参与人数',
			dataIndex: 'total_person',
			key: 'total_person',
		},
		{
			title: '报名人数',
			dataIndex: 'apply_num',
			key: 'apply_num',
		},
		{
			title: '组团人数',
			dataIndex: 'cluster_num',
			key: 'cluster_num',
		},
		{
			title: '限制人数',
			dataIndex: 'limit_num',
			key: 'limit_num',
		},
		{
			title: '权重',
			dataIndex: 'sort',
			key: 'sort',
		},
		{
			title: '课程周期',
			dataIndex: 'time',
			key: 'time',
			render: (txt, record) => (
				<span>
					{record.start_time}-{record.end_time}
				</span>
			),
		},
		{
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
			render: (txt, record) => (
				<span>
					<Button onClick={() => onClickDetail(record)} type="link">
						编辑
					</Button>
					<Button onClick={() => onClickDetail(record)} type="link">
						详情
					</Button>
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
		dispatch(action.getSubjectsByPageFunc({ current: page }));
	};

	return (
		<div className={styles.wrap}>
			<Spin spinning={loading}>
				<Search controllerAddDialog={controllerAddDialog} />
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
			{addDialogVisible && (
				<AddDialog onSearch={onSearch} controllerDialog={controllerAddDialog} status="new" editData={{}} />
			)}
			{detailDialogVisible && (
				<DetailDialog
					editData={editData}
					detailId={detailId}
					controllerDialog={controllerDetailDialog}
					onSearch={onSearch}
				/>
			)}
		</div>
	);
};

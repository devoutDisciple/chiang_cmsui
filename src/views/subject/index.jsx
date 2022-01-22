/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Spin, Table, Button, Popconfirm, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { filterContentTypeByTxt } from '@utils/filter';
import request from '@utils/AxiosRequest';
// import DetailDialog from '@component/subjectDetail/index';
import GoodsRecord from '@component/goods/index';
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
	const [detailDialogVisible, setDetailDialogVisible] = useState(false);
	const [goodsVisible, setGoodsVisible] = useState(false);
	const [subjectGoodsId, setContentGoodsId] = useState('');
	const [subjectDetailId, setContentDetailId] = useState('');

	const onSearch = () => {
		dispatch(action.getSubjectsByPageFunc({}));
	};

	const controllerDetailDialog = () => setDetailDialogVisible(!detailDialogVisible);

	// 删除内容
	const deleteRecord = (record) => {
		request.get('/subject/deleteById', { subjectId: record.id }).then(() => {
			message.success('删除成功');
			onSearch();
		});
	};

	const controllerGoodsDialog = () => {
		setGoodsVisible(!goodsVisible);
	};

	const columns = [
		{
			title: '所属项目',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: '课程类别',
			dataIndex: 'project_id',
			key: 'project_id',
		},
		{
			title: '标题',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: '详情图片',
			dataIndex: 'url',
			key: 'url',
		},
		{
			title: '总价',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: '报名价格',
			dataIndex: 'apply_price',
			key: 'apply_price',
		},
		{
			title: '组团价格',
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
			title: '课程状态',
			dataIndex: 'state',
			key: 'state',
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
					<Button
						onClick={() => {
							controllerDetailDialog();
							setContentDetailId(record.id);
						}}
						type="link"
					>
						详情
					</Button>
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
			{goodsVisible && (
				<GoodsRecord subjectId={subjectGoodsId} type={1} controllerDialog={controllerGoodsDialog} />
			)}
		</div>
	);
};

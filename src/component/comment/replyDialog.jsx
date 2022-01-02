/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useCallback, useState } from 'react';
import { Button, Table, Image, Popconfirm, message, Modal } from 'antd';
import ShowImg from '@component/showImg/index';
import request from '@utils/AxiosRequest';
import styles from './index.less';

export default ({ commentId, controllerModal, onSearchDetail }) => {
	const [datasource, setDatasource] = useState([]);
	const [current, setCurrent] = useState(1);
	const [showImgVisible, setShowImgVisible] = useState(false);
	const [showImgList, setShowImgList] = useState([]);

	const onSearchList = useCallback(() => {
		request.get('/reply/allByCommentId', { comment_id: commentId, current }).then((res) => {
			const data = res.data || [];
			setDatasource(data);
		});
	}, [commentId, current]);

	useEffect(() => {
		onSearchList();
	}, [onSearchList, current]);

	// 删除评论
	const deleteRecord = (record) => {
		request.post('/reply/deleteCommentById', { id: record.id, content_id: commentId }).then((res) => {
			if (res.data === 'success') {
				message.success('删除成功');
				onSearchList();
				onSearchDetail();
			}
		});
	};

	// 查看图片
	const onSearchImg = (record) => {
		setShowImgList(record.img_urls || []);
		setShowImgVisible(true);
	};

	const columns = [
		{
			title: '用户头像',
			dataIndex: 'userPhoto',
			key: 'userSchool',
			render: (txt) => <Image src={txt} width="60px" height="60px" style={{ borderRadius: '100%' }} />,
		},
		{
			title: '用户名称',
			dataIndex: 'username',
			key: 'username',
		},
		{
			title: '学校',
			dataIndex: 'userSchool',
			key: 'userSchool',
		},
		{
			title: '评论内容',
			dataIndex: 'desc',
			key: 'desc',
		},
		{
			title: '点赞',
			dataIndex: 'goods',
			key: 'goods',
		},
		{
			title: '评论图片',
			dataIndex: 'img_urls',
			key: 'img_urls',
			render: (txt, record) => (
				<span className={styles.detail_num} onClick={() => onSearchImg(record)}>
					{txt.length || 0}
				</span>
			),
		},
		{
			title: '评论时间',
			dataIndex: 'create_time',
			key: 'create_time',
		},
		{
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
			render: (txt, record) => (
				<>
					<Popconfirm
						placement="top"
						title="是否确认删除"
						onConfirm={() => deleteRecord(record)}
						okText="确定"
						cancelText="取消"
					>
						<Button type="link">删除</Button>
					</Popconfirm>
				</>
			),
		},
	];

	const pageChange = (page) => {
		setCurrent(page);
	};

	return (
		<Modal title="评论回复" footer={null} width="1200px" visible onCancel={controllerModal}>
			<Table
				rowKey="id"
				dataSource={datasource}
				columns={columns}
				pagination={{
					current,
					total: datasource.length,
					pageSize: 10,
					showTotal: (total) => `共 ${total} 条`,
					onChange: pageChange,
				}}
			/>
			{showImgVisible && <ShowImg imgs={showImgList} controllerModal={() => setShowImgVisible(false)} />}
		</Modal>
	);
};

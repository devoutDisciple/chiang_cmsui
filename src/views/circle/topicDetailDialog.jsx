import React, { useEffect, useCallback, useState } from 'react';
import { Modal, Button, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as action from './redux/action';
import AddTopicDialog from './AddTopicDialog';
import styles from './index.less';

export default ({ circleId, controllerDialog }) => {
	const { topicList } = useSelector((state) => state.circle);
	const [addDialogVisible, setAddDialogVisible] = useState(false);
	const dispatch = useDispatch();

	const onSearch = useCallback(() => {
		dispatch(action.onSearchTopics({ circle_id: circleId }));
	}, [circleId, dispatch]);

	useEffect(() => {
		onSearch();
	}, [circleId, onSearch]);

	const handleOk = () => {
		controllerDialog();
	};

	const handleCancel = () => {
		controllerDialog();
	};

	const onDeleteTopic = (record) => {
		dispatch(action.onDeleteTopic({ topicId: record.id }, onSearch));
	};

	const controllerTopicDialog = () => {
		setAddDialogVisible(!addDialogVisible);
	};

	const columns = [
		{
			title: '话题名称',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
			render: (txt, record) => (
				<Button onClick={() => onDeleteTopic(record)} type="link">
					删除
				</Button>
			),
		},
	];

	return (
		<Modal className={styles.dialog} title="话题" visible onOk={handleOk} onCancel={handleCancel}>
			<div>
				<Button type="primary" onClick={controllerTopicDialog}>
					添加话题
				</Button>
			</div>
			<Table rowKey="id" dataSource={topicList} columns={columns} pagination={false} />
			{addDialogVisible && <AddTopicDialog circleId={circleId} controllerDialog={controllerTopicDialog} />}
		</Modal>
	);
};

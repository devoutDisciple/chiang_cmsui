import React from 'react';
import { Spin, Table, Image } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FEEDBACK_TYPE } from '@utils/const';
import Search from './Search';
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

	const columns = [
		{
			title: '反馈类型',
			dataIndex: 'type',
			key: 'type',
			render: (txt) => <>{FEEDBACK_TYPE.filter((item) => txt === item.value)[0]?.label}</>,
		},

		{
			title: '用户姓名',
			dataIndex: 'username',
			key: 'username',
		},
		{
			title: '用户头像',
			dataIndex: 'userPhoto',
			key: 'userPhoto',
			render: (txt) => <Image src={txt} style={{ borderRadius: '100%' }} width={80} height={80} />,
		},
		{
			title: '描述信息',
			dataIndex: 'desc',
			key: 'desc',
		},
		{
			title: '创建时间',
			dataIndex: 'create_time',
			key: 'create_time',
		},
	];

	const pageChange = (page) => {
		dispatch(action.getFeedBackByPage({ current: page }));
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

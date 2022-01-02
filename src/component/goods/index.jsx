import React from 'react';
import { Modal, Button, Image, Popconfirm } from 'antd';
import request from '@utils/AxiosRequest';

export default ({ controllerDialog, type, contentId }) => {
	console.log(1111);

	const onSearch = () => {
		request.get('');
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

	const pageChange = (page) => {};

	return (
		<Modal title="点赞记录" footer={null} width="1200px" visible onCancel={() => {}}>
			121212
		</Modal>
	);
};

import React, { useEffect, useState, useCallback } from 'react';
import { Modal, Descriptions } from 'antd';
import request from '@utils/AxiosRequest';
import { filterContentTypeByTxt } from '@utils/filter';
import VideoContent from '@component/video/index';
import PostsContent from '@component/posts/index';
import VoteContent from '@component/vote/index';
import BattleCOntent from '@component/battle/index';
import Comment from '@component/comment/index';

export default ({ contentId, controllerDialog }) => {
	const [detail, setDetail] = useState({ userDetail: {}, postsDetail: {}, videoDetail: {} });

	const onSearch = useCallback(() => {
		request.get('/content/contentDetail', { content_id: contentId }).then((res) => {
			setDetail(res.data || {});
		});
	}, [contentId]);

	useEffect(() => {
		onSearch();
	}, [onSearch]);

	const onCancel = () => {
		controllerDialog();
	};
	return (
		<Modal title="详情" footer={null} width="1200px" visible onCancel={onCancel}>
			<Descriptions title="基本内容">
				<Descriptions.Item label="发布人姓名">{detail.userDetail.username}</Descriptions.Item>
				{/* <Descriptions.Item label="发布人头像">
					<Image width={60} height={60} style={{ borderRadius: '100%' }} src={detail.userDetail.photo} />
				</Descriptions.Item> */}
				<Descriptions.Item label="发布人学校">{detail.userDetail.school}</Descriptions.Item>
				<Descriptions.Item label="发布圈子">{detail.circle_names?.join(',')}</Descriptions.Item>
				<Descriptions.Item label="包含话题">{detail.topic_names?.join(',') || '--'}</Descriptions.Item>
				<Descriptions.Item label="发布类型">{filterContentTypeByTxt(detail.type)}</Descriptions.Item>
				<Descriptions.Item label="点赞量">{detail.goods || 0}</Descriptions.Item>
				<Descriptions.Item label="评论数">{detail.comment || 0}</Descriptions.Item>
				<Descriptions.Item label="转发数">{detail.share || 0}</Descriptions.Item>
				<Descriptions.Item label="热度">{detail.hot || 0}</Descriptions.Item>
				<Descriptions.Item label="发布时间">{detail.create_time}</Descriptions.Item>
			</Descriptions>
			{detail.type === 1 || detail.type === 2 || detail.type === 6 ? (
				<PostsContent content={detail} detail={detail.postsDetail} />
			) : null}
			{detail.type === 3 && <VoteContent detail={detail.voteDetail} />}
			{detail.type === 4 && <BattleCOntent detail={detail.battleDetail} />}
			{detail.type === 5 && <VideoContent detail={detail.videoDetail} />}
			<Descriptions title="评论详情" />
			<Comment contentId={contentId} onSearchDetail={onSearch} />
		</Modal>
	);
};

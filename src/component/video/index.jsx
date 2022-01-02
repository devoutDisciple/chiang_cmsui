import React from 'react';
import { Descriptions, Image } from 'antd';
import { handleSize } from '@utils/util';
import styles from './index.less';

export default ({ detail = { photo: {} } }) => (
	<div>
		<Descriptions title="视频内容">
			<Descriptions.Item label="视频时长">{detail.duration} 秒</Descriptions.Item>
			<Descriptions.Item label="视频大小">{handleSize(detail.size)}</Descriptions.Item>
			<Descriptions.Item label="视频宽度">{detail.width}</Descriptions.Item>
			<Descriptions.Item label="视频高度">{detail.height}</Descriptions.Item>
			<Descriptions.Item label="封面图片">
				<Image width={30} src={detail.photo.url} />
			</Descriptions.Item>
		</Descriptions>
		<div>视频：</div>
		{detail.width > detail.height ? (
			<video className={styles['fix-width']} src={detail.url} controls="controls">
				您的浏览器不支持 video 标签。
			</video>
		) : (
			<video className={styles['fix-height']} src={detail.url} controls="controls">
				您的浏览器不支持 video 标签。
			</video>
		)}
	</div>
);

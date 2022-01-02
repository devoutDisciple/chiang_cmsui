import React from 'react';
import { Descriptions } from 'antd';
import { filterVoteType } from '@utils/filter';
import styles from './index.less';

const DescriptionsItem = Descriptions.Item;

export default ({ detail = {} }) => {
	console.log(detail, 2222);
	return (
		<div>
			<Descriptions title="发布内容">
				<DescriptionsItem label="投票标题">{detail.title}</DescriptionsItem>
				<DescriptionsItem label="投票类型">{filterVoteType(detail.type)}</DescriptionsItem>
				<DescriptionsItem label="总票数">{detail.total || 0}</DescriptionsItem>
			</Descriptions>
			<div className={styles.chunk}>
				<div className={styles.chunk_title}>投票内容：</div>
				<div className={styles.chunk_con}>
					{detail.content &&
						detail.content.map((item, index) => (
							<div className={styles.vote} key={index}>
								<div className={styles.vote_num}>
									<span>票数:</span>
									<span>{item.num}</span>
								</div>
								<div className={styles.vote_chunk}>
									<span>选项{item.idx + 1}：</span>
									<span>{item.value}</span>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

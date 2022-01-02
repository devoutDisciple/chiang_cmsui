import React from 'react';
import { Descriptions } from 'antd';
import MyImg from '@component/MyImg';
import moment from 'moment';
import { filterBattleType } from '@utils/filter';
import styles from './index.less';

const DescriptionsItem = Descriptions.Item;

export default ({ detail = {} }) => (
	<div>
		<Descriptions title="发布内容">
			<DescriptionsItem label="发布标题">{detail.title}</DescriptionsItem>
			<DescriptionsItem label="投票时间">{filterBattleType(detail.type)}</DescriptionsItem>
			<DescriptionsItem label="截止日期">
				{moment(detail.dead_time).format('YYYY-MM-DD HH:mm:ss')}
			</DescriptionsItem>
		</Descriptions>
		<div className={styles.chunk}>
			<div className={styles.chunk_title}>pk详情：</div>
			<div className={styles.chunk_con}>
				<div className={styles.chunk_con_item}>
					<div className={styles.battle_desc}>
						<div>红色方名称：{detail.red_name}</div>
						<div>红色方票数：{detail.red_ticket}</div>
						<div>红色方占比：{detail.red_percent}%</div>
					</div>
					<div className={styles.battle_img}>
						<MyImg url={detail.red_url} />
					</div>
				</div>
				<div className={styles.chunk_con_item}>
					<div className={styles.battle_desc}>
						<div>蓝色方名称：{detail.blue_name}</div>
						<div>蓝色方票数：{detail.blue_ticket}</div>
						<div>蓝色方占比：{detail.blue_percent}%</div>
					</div>
					<div className={styles.battle_img}>
						<MyImg url={detail.blue_url} />
					</div>
				</div>
			</div>
		</div>
	</div>
);

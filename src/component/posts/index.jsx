import React from 'react';
import { Descriptions } from 'antd';
import MyImg from '@component/MyImg';
import styles from './index.less';

const DescriptionsItem = Descriptions.Item;

export default ({ detail = {} }) => (
	<div>
		<Descriptions title="发布内容">
			{detail.title && <DescriptionsItem label="发布标题">{detail.title}</DescriptionsItem>}
			{detail.desc && <DescriptionsItem label="发布内容">{detail.desc}</DescriptionsItem>}
		</Descriptions>
		<div className={styles.chunk}>
			<div className={styles.chunk_title}>图片：</div>
			<div className={styles.chunk_con}>
				{detail.img_urls &&
					detail.img_urls.map((item, index) => (
						<div key={index} className={styles.chunk_con_img}>
							<MyImg url={item} />
						</div>
					))}
			</div>
		</div>
	</div>
);

import React from 'react';
import { Modal } from 'antd';
import MyImg from '@component/MyImg/index';
import styles from './index.less';

export default ({ imgs, controllerModal }) => (
	<Modal title="图片" visible width={900} footer={null} onCancel={controllerModal}>
		<div className={styles.con}>
			{imgs &&
				imgs.map((item, index) => (
					<div className={styles.img_con}>
						<MyImg key={index} url={item} />
					</div>
				))}
		</div>
	</Modal>
);

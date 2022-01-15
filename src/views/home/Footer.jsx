import React from 'react';
import config from '@config/config';
import styles from './index.less';

export default () => (
	<div className={styles.layout_right_footer}>
		<img src={config.logoUrl} alt="加载失败" />
		<span>驰昂教育</span>
	</div>
);

import React from 'react';
import styles from './index.less';

export default ({ title, num, desc }) => (
	<div className={styles.title_chunk}>
		<div className={styles.title_chunk_name}>{title}</div>
		<div className={styles.title_chunk_num}>{num}</div>
		<div className={styles.title_chunk_name}>{desc}</div>
	</div>
);

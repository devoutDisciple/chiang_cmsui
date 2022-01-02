import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

const globalLoading = () => (
	<Spin size="large">
		<div className={styles.global_spin} />
	</Spin>
);

export default globalLoading;

import React from 'react';
import MyIcon from '@component/Icon/Icon';
import { useSelector } from 'react-redux';
import styles from './index.less';

export default () => {
	const user = useSelector((state) => state.user);
	return (
		<div className={styles.loayout_right_header}>
			<span>
				<MyIcon type="icontuichu" />
				<span>
					您好，
					{user.userinfo.username}
				</span>
			</span>
		</div>
	);
};

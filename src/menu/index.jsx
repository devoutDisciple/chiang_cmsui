import React from 'react';
import { Menu } from 'antd';
import MyIcon from '@component/Icon/Icon';
import { useHistory } from 'react-router-dom';
import router from '@router/router';
import styles from './index.less';

const MenuItem = Menu.Item;
export default () => {
	const history = useHistory();
	const onSelectMenu = (data) => history.push(data.path);
	return (
		<>
			<div className={styles.title}>omoschool</div>
			<Menu className={styles.menu} defaultSelectedKeys={['data']} mode="inline" theme="dark">
				{router.contentRouter.map((item) => {
					if (item.showMenu) {
						return (
							<MenuItem onClick={() => onSelectMenu(item)} key={item.key}>
								{item.icon && <MyIcon type={item.icon} />}
								<span>{item.name}</span>
							</MenuItem>
						);
					}
					return null;
				})}
			</Menu>
		</>
	);
};

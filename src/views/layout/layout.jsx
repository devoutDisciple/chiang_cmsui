import React, { useEffect, lazy, Suspense } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLoginFunc } from '@store/global/action';
import Loading from '@component/GlobalLoading';
import { message } from 'antd';
import router from '@router/router';

export default () => {
	const dispatch = useDispatch();
	useEffect(() => {
		message.config({ top: 100, duration: 2, maxCount: 1 });
		// 获取用户是否登录
		dispatch(getLoginFunc());
	}, [dispatch]);

	return (
		<HashRouter>
			<Suspense fallback={<Loading />}>
				<Switch>
					{router.rootRouter.map((item) => (
						<Route key={item.key} path={item.path} component={lazy(item.components)} />
					))}
					<Redirect key="root" to={{ pathname: '/home/data' }} />
				</Switch>
			</Suspense>
		</HashRouter>
	);
};

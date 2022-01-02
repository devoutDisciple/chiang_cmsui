import { getLogin, login } from '@service/login.js';

// 验证是否登录
export const getLoginFunc = () => (dispatch) => {
	getLogin().then((res) => {
		dispatch({
			type: 'user/setLogin',
			payload: res.data,
		});
	});
};

// 验证是否登录
export const loginFunc = (values, history) => (dispatch) => {
	login(values).then((res) => {
		dispatch({
			type: 'user/setUserinfo',
			payload: res.data,
		});
		history.push('/');
	});
};

const USER_INIT_STATE = {
	isLogin: false, // 是否登录
	userinfo: {}, // 用户信息
};
export default {
	user: (state = USER_INIT_STATE, action) => {
		switch (action.type) {
			case 'user/setLogin':
				return { ...state, isLogin: true, userinfo: { ...state.userinfo, ...action.payload } };
			case 'user/setUserinfo':
				return { ...state, isLogin: true, userinfo: { ...state.userinfo, ...action.payload } };
			default:
				return state;
		}
	},
	common: (state = {}, action) => {
		switch (action.type) {
			case 'common/setLogin':
				return { ...state, isLogin: true };
			default:
				return state;
		}
	},
};

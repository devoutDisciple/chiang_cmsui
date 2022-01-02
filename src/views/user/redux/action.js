import { getUsersByPage } from '@service/user';
import moment from 'moment';
// 设置loading
const setLoading = (flag, dispatch) => {
	dispatch({
		type: 'member/setLoading',
		payload: flag,
	});
};

// 分页获取数据
export const getUsersByPageFunc = (params) => (dispatch, getState) => {
	setLoading(true, dispatch);
	const {
		member: { condition },
	} = getState();
	params = { ...condition, ...params };
	if (Array.isArray(params.date) && params.date.length !== 0) {
		params.startTime = moment(params.date[0]).format('YYYY-MM-DD 00:00:00');
		params.endtTime = moment(params.date[1]).format('YYYY-MM-DD 23:59:59');
		delete params.date;
	}
	getUsersByPage(params)
		.then((res) => {
			dispatch({
				type: 'member/setTableData',
				payload: { result: res.data, condition: params },
			});
		})
		.finally(() => setLoading(false, dispatch));
};

// 获取用户增长曲线
export const getUserNumDataFunc = () => () => {};

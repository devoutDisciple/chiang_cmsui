import { getAllFeedback } from '@service/common';
// 设置loading
const setLoading = (flag, dispatch) => {
	dispatch({
		type: 'feedback/setLoading',
		payload: flag,
	});
};

// 分页获取数据
export const getFeedBackByPage = (params) => (dispatch, getState) => {
	setLoading(true, dispatch);
	const {
		feedback: { condition },
	} = getState();
	params = { ...condition, ...params };
	getAllFeedback(params)
		.then((res) => {
			dispatch({
				type: 'feedback/setTableData',
				payload: { result: res.data, condition: params },
			});
		})
		.finally(() => setLoading(false, dispatch));
};

export const test = () => {};

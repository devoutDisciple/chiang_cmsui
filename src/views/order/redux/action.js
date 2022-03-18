import { getOrdersByPage } from '@service/common';
// 设置loading
const setLoading = (flag, dispatch) => {
	dispatch({
		type: 'order/setLoading',
		payload: flag,
	});
};

// 获取所有数据
export const getOrderByPageFunc = (params) => (dispatch) => {
	setLoading(true, dispatch);
	getOrdersByPage(params)
		.then((res) => {
			dispatch({
				type: 'order/setTableData',
				payload: { result: res.data, condition: params },
			});
		})
		.finally(() => setLoading(false, dispatch));
};

// 删除老师
export const test = () => {};

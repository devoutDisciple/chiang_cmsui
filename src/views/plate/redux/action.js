import { getPlatesByPage, deletePlateById, addPlate, editPlate } from '@service/common';
import { message } from 'antd';
import moment from 'moment';
// 设置loading
const setLoading = (flag, dispatch) => {
	dispatch({
		type: 'plate/setLoading',
		payload: flag,
	});
};

// 分页获取数据
export const getPlatesByPageFunc = (params) => (dispatch, getState) => {
	setLoading(true, dispatch);
	const {
		plate: { condition },
	} = getState();
	params = { ...condition, ...params };
	if (Array.isArray(params.date) && params.date.length !== 0) {
		params.startTime = moment(params.date[0]).format('YYYY-MM-DD 00:00:00');
		params.endtTime = moment(params.date[1]).format('YYYY-MM-DD 23:59:59');
		delete params.date;
	}
	getPlatesByPage(params)
		.then((res) => {
			dispatch({
				type: 'plate/setTableData',
				payload: { result: res.data, condition: params },
			});
		})
		.finally(() => setLoading(false, dispatch));
};

// 删除模块
export const deletePlateByIdFunc = (params, onSearch) => (dispatch) => {
	deletePlateById(params)
		.then(() => {
			message.success('删除成功');
			onSearch();
		})
		.finally(() => setLoading(false, dispatch));
};

// 新增模块
export const addPlateFunc = (params, onSearch, controllerDialog) => (dispatch) => {
	addPlate(params)
		.then(() => {
			message.success('新增成功');
			onSearch();
			controllerDialog();
		})
		.finally(() => setLoading(false, dispatch));
};

// 编辑模块
export const editPlateFunc = (params, onSearch, controllerDialog) => (dispatch) => {
	editPlate(params)
		.then(() => {
			message.success('编辑成功');
			onSearch();
			controllerDialog();
		})
		.finally(() => setLoading(false, dispatch));
};

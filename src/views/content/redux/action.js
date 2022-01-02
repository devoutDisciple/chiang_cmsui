import { getAllCircles, getContentsByPage, addCircle, editCircle, getAllPlates, getAddressList } from '@service/common';
import moment from 'moment';
import { message } from 'antd';
// 设置loading
const setLoading = (flag, dispatch) => {
	dispatch({
		type: 'content/setLoading',
		payload: flag,
	});
};

// 获取所有圈子
export const getCirclesAll = () => (dispatch) => {
	setLoading(true, dispatch);
	getAllCircles()
		.then((res) => {
			dispatch({
				type: 'content/setAllCircle',
				payload: res.data,
			});
		})
		.finally(() => setLoading(false, dispatch));
};

// 分页获取数据
export const getContentsByPageFunc = (params) => (dispatch, getState) => {
	setLoading(true, dispatch);
	const {
		content: { condition },
	} = getState();
	if (Array.isArray(params.date) && params.date.length !== 0) {
		params.startTime = moment(params.date[0]).format('YYYY-MM-DD 00:00:00');
		params.endtTime = moment(params.date[1]).format('YYYY-MM-DD 23:59:59');
		delete params.date;
	}
	params = { ...condition, ...params };
	getContentsByPage(params)
		.then((res) => {
			dispatch({
				type: 'content/setTableData',
				payload: { result: res.data, condition: params },
			});
		})
		.finally(() => setLoading(false, dispatch));
};

// 查询模块信息
export const getPlateListFunc = () => (dispatch) => {
	setLoading(true, dispatch);
	getAllPlates()
		.then((res) => {
			dispatch({
				type: 'content/setPlateList',
				payload: res.data,
			});
		})
		.finally(() => setLoading(false, dispatch));
};

// 查询地址信息
export const getAddressListFunc = () => (dispatch) => {
	setLoading(true, dispatch);
	getAddressList()
		.then((res) => {
			dispatch({
				type: 'content/addressList',
				payload: res.data,
			});
		})
		.finally(() => setLoading(false, dispatch));
};

// 新增圈子
export const addCircleFunc = (params, onSearch, controllerDialog) => (dispatch) => {
	addCircle(params)
		.then(() => {
			message.success('新增成功');
			onSearch();
			controllerDialog();
		})
		.finally(() => setLoading(false, dispatch));
};

// 编辑模块
export const editCircleFunc = (params, onSearch, controllerDialog) => (dispatch) => {
	editCircle(params)
		.then(() => {
			message.success('编辑成功');
			onSearch();
			controllerDialog();
		})
		.finally(() => setLoading(false, dispatch));
};

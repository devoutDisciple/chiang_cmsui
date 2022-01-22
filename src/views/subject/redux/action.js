import { getSubjectsByPage, addSubject, editCircle, getAllPorjectByType, getAddressList } from '@service/common';
import moment from 'moment';
import { message } from 'antd';
// 设置loading
const setLoading = (flag, dispatch) => {
	dispatch({
		type: 'subject/setLoading',
		payload: flag,
	});
};

// 分页获取数据
export const getSubjectsByPageFunc = (params) => (dispatch, getState) => {
	setLoading(true, dispatch);
	const {
		subject: { condition },
	} = getState();
	if (Array.isArray(params.date) && params.date.length !== 0) {
		params.startTime = moment(params.date[0]).format('YYYY-MM-DD 00:00:00');
		params.endtTime = moment(params.date[1]).format('YYYY-MM-DD 23:59:59');
		delete params.date;
	}
	params = { ...condition, ...params };
	getSubjectsByPage(params)
		.then((res) => {
			dispatch({
				type: 'subject/setTableData',
				payload: { result: res.data, condition: params },
			});
		})
		.finally(() => setLoading(false, dispatch));
};

// 查询课程类别信息
export const getProjectByType = (params) => (dispatch) => {
	setLoading(true, dispatch);
	getAllPorjectByType(params)
		.then((res) => {
			dispatch({
				type: 'subject/setPorjectList',
				payload: res.data,
			});
		})
		.finally(() => setLoading(false, dispatch));
};

// 查询课程类别信息（下拉框）
export const getProjectByTypeBySelect = (params) => (dispatch) => {
	setLoading(true, dispatch);
	getAllPorjectByType(params)
		.then((res) => {
			dispatch({
				type: 'subject/setPorjectListSelect',
				payload: res.data,
			});
		})
		.finally(() => setLoading(false, dispatch));
};

// 嫌憎课程
export const addSubjectFunc = (params, onSearch, controllerDialog) => (dispatch) => {
	addSubject(params)
		.then(() => {
			message.success('新增成功');
			onSearch();
			controllerDialog();
		})
		.finally(() => setLoading(false, dispatch));
};

// 查询地址信息
export const getAddressListFunc = () => (dispatch) => {
	setLoading(true, dispatch);
	getAddressList()
		.then((res) => {
			dispatch({
				type: 'subject/addressList',
				payload: res.data,
			});
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

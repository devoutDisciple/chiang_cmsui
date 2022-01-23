import { getTeachersByPage, deleteTeacherById } from '@service/common';
import { message } from 'antd';
// 设置loading
const setLoading = (flag, dispatch) => {
	dispatch({
		type: 'teacher/setLoading',
		payload: flag,
	});
};

// 获取所有数据
export const getAllTeacherFunc = (params) => (dispatch) => {
	setLoading(true, dispatch);
	getTeachersByPage()
		.then((res) => {
			dispatch({
				type: 'teacher/setTableData',
				payload: { result: res.data, condition: params },
			});
		})
		.finally(() => setLoading(false, dispatch));
};

// 删除老师
export const deleteTeacherByIdFunc = (params, onSearch) => (dispatch) => {
	deleteTeacherById(params)
		.then(() => {
			message.success('删除成功');
			onSearch();
		})
		.finally(() => setLoading(false, dispatch));
};

import { getAllProjectByTypeId, addProject, deleteProject } from '@service/common';
import { message } from 'antd';
// 设置loading
const setLoading = (flag, dispatch) => {
	dispatch({
		type: 'feedback/setLoading',
		payload: flag,
	});
};

// 分页获取数据
export const getProjectByType = (params) => (dispatch, getState) => {
	setLoading(true, dispatch);
	const {
		feedback: { condition },
	} = getState();
	params = { ...condition, ...params };
	getAllProjectByTypeId(params)
		.then((res) => {
			dispatch({
				type: 'feedback/setTableData',
				payload: { result: res.data, condition: params },
			});
		})
		.finally(() => setLoading(false, dispatch));
};

// 新增
export const addProjectFunc = (params, onSearch, controllerDialog) => (dispatch) => {
	setLoading(true, dispatch);
	addProject(params)
		.then(() => {
			message.success('新增成功');
			onSearch();
			controllerDialog();
		})
		.finally(() => setLoading(false, dispatch));
};

// 删除 deleteRecord
export const deleteRecordFunc = (params, onSearch) => (dispatch) => {
	setLoading(true, dispatch);
	deleteProject(params)
		.then(() => {
			message.success('删除成功');
			onSearch();
		})
		.finally(() => setLoading(false, dispatch));
};
export const test = () => {};

import { getSwipersByPage, deleteSwiperById, addSwiper, editSwiper } from '@service/common';
import { message } from 'antd';
// 设置loading
const setLoading = (flag, dispatch) => {
	dispatch({
		type: 'swiper/setLoading',
		payload: flag,
	});
};

// 获取所有数据
export const getAllSwiperFunc = (params) => (dispatch) => {
	setLoading(true, dispatch);
	getSwipersByPage()
		.then((res) => {
			dispatch({
				type: 'swiper/setTableData',
				payload: { result: res.data, condition: params },
			});
		})
		.finally(() => setLoading(false, dispatch));
};

// 删除轮播图
export const deleteSwiperByIdFunc = (params, onSearch) => (dispatch) => {
	deleteSwiperById(params)
		.then(() => {
			message.success('删除成功');
			onSearch();
		})
		.finally(() => setLoading(false, dispatch));
};

// 新增轮播图
export const addSwiperFunc = (params, onSearch, controllerDialog) => (dispatch) => {
	addSwiper(params)
		.then(() => {
			message.success('新增成功');
			onSearch();
			controllerDialog();
		})
		.finally(() => setLoading(false, dispatch));
};

// 编辑轮播图
export const editSwiperFunc = (params, onSearch, controllerDialog) => (dispatch) => {
	editSwiper(params)
		.then(() => {
			message.success('编辑成功');
			onSearch();
			controllerDialog();
		})
		.finally(() => setLoading(false, dispatch));
};

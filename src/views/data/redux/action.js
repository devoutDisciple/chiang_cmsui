import { getData, getUserNumData, getSalesMoneyData, getSignupData, getTeamData } from '@service/data';

// 获取汇总数据
export const getDataFunc = () => (dispatch) => {
	getData().then((res) => {
		dispatch({
			type: 'data/setStatisticsData',
			payload: res.data,
		});
	});
};

// 获取用户增长曲线
export const getUserNumDataFunc = (date) => (dispatch) => {
	getUserNumData(date).then((res) => {
		if (Array.isArray(res.data)) {
			const xAxis = [];
			const yAxis = [];
			res.data.forEach((item) => {
				xAxis.push(item.time);
				yAxis.push(item.num);
			});
			dispatch({
				type: 'data/setUserData',
				payload: { xAxis, yAxis },
			});
		}
	});
};

// 获取发布内容增长曲线
export const getSalesNumDataFunc = (date) => (dispatch) => {
	getSalesMoneyData(date).then((res) => {
		if (Array.isArray(res.data)) {
			const xAxis = [];
			const yAxis = [];
			res.data.forEach((item) => {
				xAxis.push(item.time);
				yAxis.push(item.money);
			});
			dispatch({
				type: 'data/setSalesData',
				payload: { xAxis, yAxis },
			});
		}
	});
};

// 获取报名增长曲线
export const getSignupDataFunc = (date) => (dispatch) => {
	getSignupData(date).then((res) => {
		if (Array.isArray(res.data)) {
			const xAxis = [];
			const yAxis = [];
			res.data.forEach((item) => {
				xAxis.push(item.time);
				yAxis.push(item.num);
			});
			dispatch({
				type: 'data/setSignupData',
				payload: { xAxis, yAxis },
			});
		}
	});
};

// 获取评论增长曲线
export const getTeamDataFunc = (date) => (dispatch) => {
	getTeamData(date).then((res) => {
		if (Array.isArray(res.data)) {
			const xAxis = [];
			const yAxis = [];
			res.data.forEach((item) => {
				xAxis.push(item.time);
				yAxis.push(item.num);
			});
			dispatch({
				type: 'data/setTeamData',
				payload: { xAxis, yAxis },
			});
		}
	});
};

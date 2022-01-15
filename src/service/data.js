import request from '@utils/AxiosRequest';

// 获取统计数据
export const getData = (params) => request.get('/data/total', params);

// 获取用户增长曲线
export const getUserNumData = (params) => request.get('/data/userNumData', params);

// 获取收入增长数据
export const getSalesMoneyData = (params) => request.get('/data/salesMoneyData', params);

// 获取报名增长曲线
export const getSignupData = (params) => request.get('/data/signupData', params);

// 获取组团增长曲线
export const getTeamData = (params) => request.get('/data/teamData', params);

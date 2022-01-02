import request from '@utils/AxiosRequest';

// 分页获取用户数据
export const getPlatesByPage = (params) => request.get('/plate/platesByPage', params);

export const deletePlateById = (params) => request.post('/plate/deleteById', params);

export const addPlate = (params) => request.post('/plate/add', params);

export const editPlate = (params) => request.post('/plate/edit', params);

export const getCircleByPage = (params) => request.get('/circle/circlesByPage', params);

export const getAllPlates = (params) => request.get('/plate/allPlates', params);

export const getAddressList = (params) => request.get('/address/all', params);

export const addCircle = (params) => request.post('/circle/add', params);

export const deleteCircle = (params) => request.post('/circle/delete', params);

export const editCircle = (params) => request.post('/circle/edit', params);

export const getAllCircles = (params) => request.get('/circle/circlesDetail', params);

export const getContentsByPage = (params) => request.get('/content/contentsByPage', params);

export const getAllTopics = (params) => request.get('/topic/allByCircleId', params);

export const deleteTopic = (params) => request.post('/topic/delete', params);

export const getAllFeedback = (params) => request.get('/feedback/all', params);

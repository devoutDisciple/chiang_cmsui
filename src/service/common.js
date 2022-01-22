import request from '@utils/AxiosRequest';

export const getSwipersByPage = (params) => request.get('/swiper/all', params);

export const deleteSwiperById = (params) => request.post('/swiper/deleteById', params);

export const addSwiper = (params) => request.post('/swiper/add', params);

export const editSwiper = (params) => request.post('/swiper/edit', params);

export const getCircleByPage = (params) => request.get('/circle/circlesByPage', params);

export const getAddressList = (params) => request.get('/address/all', params);

export const addCircle = (params) => request.post('/circle/add', params);

export const deleteCircle = (params) => request.post('/circle/delete', params);

export const editCircle = (params) => request.post('/circle/edit', params);

export const getAllCircles = (params) => request.get('/circle/circlesDetail', params);

export const getSubjectsByPage = (params) => request.get('/subject/allByContions', params);

export const getAllPorjectByType = (params) => request.get('/project/allPorjectByType', params);

export const deleteTopic = (params) => request.post('/topic/delete', params);

export const getAllProjectByTypeId = (params) => request.get('/project/allProjectByTypeId', params);

export const addProject = (params) => request.post('/project/add', params);

export const deleteProject = (params) => request.post('/project/deleteById', params);

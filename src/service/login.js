import request from '@utils/AxiosRequest';

export const getLogin = (params) => request.get('/account/isLogin', params);

export const login = (params) => request.post('/account/login', params);

import request from '@utils/AxiosRequest';

// 分页获取用户数据
// eslint-disable-next-line import/prefer-default-export
export const getUsersByPage = (params) => request.get('/user/usersByPage', params);

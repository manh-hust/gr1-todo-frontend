import axiosApi from './axiosApi';

export const createNotification = async (data) => {
  const url = '/notifications';
  return await axiosApi.post(url, data);
};

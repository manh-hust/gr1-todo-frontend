import axiosApi from './axiosApi';

export const authLogin = async (data) => {
  const url = '/auth/login';
  return await axiosApi.post(url, data);
};

export const authAdminLogin = async (data) => {
  const url = '/auth/admin/login';
  return await axiosApi.post(url, data);
};

export const register = async (data) => {
  const url = '/auth/register';
  return await axiosApi.post(url, data);
};

export const loginByGoogle = async () => {
  const url = '/auth/google';
  return await axiosApi.get(url);
};

export const callbackGoogle = async (code) => {
  const url = `/auth/google/callback?code=${code}`;
  return await axiosApi.get(url);
};

export const authLogout = async () => {
  const url = '/auth/logout';
  return await axiosApi.post(url);
};

export const getUser = async () => {
  const url = '/auth/user';
  return await axiosApi.get(url);
};

import axiosApi from './axiosApi';

export const getTodoTask = async () => {
  const url = '/tasks/todo';
  return await axiosApi.get(url);
};

export const getDoneTask = async () => {
  const url = '/tasks/done';
  return await axiosApi.get(url);
};

export const getSharingTask = async () => {
  const url = '/tasks/sharing';
  return await axiosApi.get(url);
};

export const getTask = async (id) => {};

export const createTask = async (data) => {
  const url = '/tasks';
  return await axiosApi.post(url, data);
};

export const updateStatus = async (id, data) => {
  const url = `/tasks/${id}/status`;
  return await axiosApi.post(url, data);
};

export const updateTask = async (data) => {};

export const deleteTask = async (id) => {};

export const inviteMember = async (data, id) => {
  const url = `/tasks/${id}/members`;
  return await axiosApi.post(url, data);
};

export const getAllTags = async () => {
  const url = '/tags';
  return await axiosApi.get(url);
};

export const getAllMembers = async () => {
  const url = '/members';
  return await axiosApi.get(url);
};

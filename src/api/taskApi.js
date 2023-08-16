import axiosApi from './axiosApi';

export const getAllTasks = async () => {
  const url = '/tasks';
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

export const inviteMember = async (data) => {};

export const getAllTags = async () => {
  const url = '/tags';
  return await axiosApi.get(url);
};

export const getAllMembers = async () => {
  const url = '/members';
  return await axiosApi.get(url);
};

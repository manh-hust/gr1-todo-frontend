import { useEffect, useState } from 'react';
import {
  getAllMembers,
  getAllTags,
  getDoneTask,
  getSharingTask,
  getTodoTask,
} from '../api/taskApi';

const useFetchTaskData = (refetch) => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [sharingTasks, setSharingTasks] = useState([]);

  const [tags, setTags] = useState([]);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllTask = async () => {
      try {
        const todoTasks = await getTodoTask();
        const doneTasks = await getDoneTask();
        const sharingTasks = await getSharingTask();
        const tags = await getAllTags();
        const members = await getAllMembers();

        setTodoTasks(todoTasks.data);
        setDoneTasks(doneTasks.data);
        setSharingTasks(sharingTasks.data);
        setTags(tags.data);
        setMembers(members.data);
      } catch (error) {
        setError(error.data.error);
      }
    };
    fetchAllTask();
  }, [refetch]);

  return { todoTasks, sharingTasks, doneTasks, error, tags, members };
};

export default useFetchTaskData;

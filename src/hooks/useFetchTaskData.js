import { useEffect, useState } from 'react';
import { getAllMembers, getAllTags, getAllTasks } from '../api/taskApi';

const useFetchTaskData = (refetch) => {
  const [allTask, setAllTask] = useState({});
  const [tags, setTags] = useState([]);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAllTask = async () => {
      try {
        const response = await getAllTasks();
        const tags = await getAllTags();
        const members = await getAllMembers();
        setAllTask(response.data);
        setTags(tags.data);
        setMembers(members.data);
      } catch (error) {
        setError(error.data.error);
      }
    };
    fetchAllTask();
  }, [refetch]);

  return { allTask, error, tags, members };
};

export default useFetchTaskData;

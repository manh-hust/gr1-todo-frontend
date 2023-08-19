import { useEffect, useState } from 'react';
import axiosApi from '../api/axiosApi';

const useFetchData = (url, isRefresh) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAllTask = async () => {
      try {
        setLoading(true);
        const response = await axiosApi.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.data.error);
        setLoading(false);
      }
    };
    fetchAllTask();
  }, [url, isRefresh]);

  return { data, loading, error };
};

export default useFetchData;

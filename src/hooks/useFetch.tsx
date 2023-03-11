import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState<unknown>(null);

  const fetchApi = async () => {
    try {
      setLoading(true);
      let res = await fetch(url);
      res = await res.json();
      if (res) {
        setData(res);
      }
      setLoading(false);
    } catch (err) {
      setErrors(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchApi();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

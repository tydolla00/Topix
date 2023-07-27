import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const useFetch = <T>(
  url: string,
  method: Methods,
  body?: any,
  config?: any
) => {
  const [data, setData] = useState<T | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (url.length < 1) return;
    setLoading(true);
    console.log("loading here");
    fetchData(); // Call the async function inside useEffect
  }, [url, method]);

  const fetchData = async () => {
    try {
      const res = await fetch(url, method, body, config);
      console.log(res.data);
      setLoading(false);
      setData(res.data);
    } catch (error) {
      setLoading(false);
      setError("Oops, a problem occurred. Error: " + error);
    }
  };

  return { data, loading, error, setLoading };
};
export default useFetch;

const fetch = async (
  url: string,
  method: Methods,
  body?: any,
  config?: any
): Promise<AxiosResponse> => {
  switch (method) {
    case "POST":
      return await axios.post(url, body, config);
    case "GET":
      return await axios.get(url, config);
    case "DELETE":
      return await axios.delete(url, config);
  }
};

type Methods = "POST" | "GET" | "DELETE";

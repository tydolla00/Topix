import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url: string, method: Methods) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    try {
      async () => {
        const res = await fetch(url, method);
        setLoading(false);
        setData(res.data);
      };
    } catch (error) {
      setLoading(false);
      setError("Oops, a problem occured. Error: " + error);
    }
  }, [url]);

  return { data, loading, error };
};
export default useFetch;

const fetch = async (url: string, method: Methods) => {
  switch (method) {
    case "POST":
      return await axios.post(url);
    case "GET":
      return await axios.get(url);
    case "DELETE":
      return await axios.delete(url);
  }
};

type Methods = "POST" | "GET" | "DELETE";

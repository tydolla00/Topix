import axios, { AxiosResponse } from "axios";
import { useEffect, useReducer } from "react";

const useFetch = <T>(
  url: string,
  method: Methods,
  body?: any,
  config?: any
) => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: true,
    error: null,
  });

  function reducer(
    state: any,
    {
      type,
      data,
      error,
    }: { type: "loading" | "success" | "error"; data?: T; error?: Error }
  ) {
    switch (type) {
      case "loading":
        return { ...state, isLoading: true };
      case "success":
        return { data, isLoading: false, error: null };
      case "error":
        return { data: null, isLoading: false, error };
      default:
        throw new Error("Unknown action type");
    }
  }
  useEffect(() => {
    let shouldCancel = false;

    const callFetch = async () => {
      dispatch({ type: "loading" });

      try {
        const response = await fetch(url, method, body, config);
        if (shouldCancel) return;
        dispatch({ type: "success", data: response.data });
      } catch (error: any) {
        if (shouldCancel) return;
        dispatch({ type: "error", error });
      }

      callFetch();
      return () => (shouldCancel = true);
    };
  }, [url]);

  return state;
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

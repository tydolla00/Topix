import axios, { AxiosResponse } from "axios";
import { useEffect, useReducer, useCallback } from "react";

const useFetch = <T>({ url, method, body, config }: FetchParams) => {
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

  return { state };
};
export default useFetch;

export const useMyFetch = <T>({ url, method, body, config }: FetchParams) => {
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

  const fetchData = useCallback(async () => {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(url, method, body, config);
      dispatch({ type: "success", data: response.data });
    } catch (error: any) {
      dispatch({ type: "error", error });
    }
  }, [url]);

  return { state, fetchData };
};

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
    default:
      throw new Error("Unknown request method");
  }
};

type Methods = "POST" | "GET" | "DELETE";

type FetchParams = {
  url: string;
  method: Methods;
  body?: any;
  config?: any;
};

import axios from "axios";

export const getUsers = async () => {
  const data = axios.get("http://localhost:8000/users").then((res) => {
    return res.data;
  });
  return data;
};

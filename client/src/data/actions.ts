import type { ActionFunctionArgs } from "react-router-dom";
import { AuthContextType } from "../hooks/useAuth";
import { redirect } from "react-router-dom";
import axios, { AxiosError } from "axios";

export const action =
  (login: AuthContextType["login"]) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const body = Object.fromEntries(formData);
    console.log({ body });
    console.log(body);
    const data = await axios
      .post("http://localhost:8000/auth/login", body)
      .then((res) => {
        return res.data;
      })
      .catch((err: AxiosError) => {
        const error = err.response?.data as string;
        console.error(error);
        throw new Error(error || "An Error occurred p");
      });
    if (data && !Array.isArray(data)) {
      login(data);
      return redirect("/home");
    }
  };

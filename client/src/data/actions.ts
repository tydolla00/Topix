import type { ActionFunctionArgs } from "react-router-dom";
import { AuthContextType } from "../hooks/useAuth";
import { redirect } from "react-router-dom";
import axios from "axios";

export const action =
  (login: AuthContextType["login"]) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const body = Object.fromEntries(formData);
    const data = await axios
      .post("http://localhost:8000/auth/login", body)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
    if (data && !Array.isArray(data)) {
      login(data);
      return redirect("/");
    }
    throw new Error("An error occured with the login, Please try again!");
  };

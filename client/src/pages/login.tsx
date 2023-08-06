import { Navigate, useFetcher } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { InputForm } from "../components/input";

export default function Login() {
  const { authData } = useAuth();
  if (authData) return <Navigate to="/" replace />;
  const fetcher = useFetcher();

  return (
    <>
      <div className="max-w-[80vw] my-0 mx-auto flex justify-center items-center h-screen">
        <div className="w-full rounded-lg sm:max-w-md md:mt-0 xl:p-0">
          <h2 className="font-bold text-xl text-center p-8">
            Sign in to your account
          </h2>
          <fetcher.Form method="POST" action="/login">
            <div className="flex flex-col my-5 items-center">
              <InputForm placeholder="Enter your username" label="Username" />
            </div>
            <div className="flex flex-col my-5 items-center">
              <InputForm
                type="password"
                placeholder="******"
                label="Password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline btn-primary w-full"
            >
              Submit
            </button>
          </fetcher.Form>
        </div>
      </div>
    </>
  );
}

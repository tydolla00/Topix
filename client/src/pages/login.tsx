import { Navigate } from "react-router-dom";
import { UserAuthData, useAuth } from "../hooks/useAuth";
import { InputForm } from "../components/input";
import { useForm } from "react-hook-form";
import { useMyFetch } from "@/hooks/useFetch";
import { useToast } from "@/shadcn/ui/use-toast";
import { Toaster } from "@/shadcn/ui/toaster";

export default function Login() {
  const { authData, login } = useAuth();
  if (authData) return <Navigate to="/home" replace />;

  const { state, fetchData } = useMyFetch<UserAuthData>({
    url: "http://localhost:8000/auth/login",
    method: "POST",
  });
  const { toast } = useToast();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      login(await fetchData(data));
      console.log(state.data);
    } catch (error: any) {
      const errorMessage = state.error?.response?.data || error?.response?.data;
      toast({
        variant: "destructive",
        description: (errorMessage as any) || "Unexpected error",
      });
    }
  };

  return (
    <>
      <div className="max-w-[80vw] my-0 mx-auto flex justify-center items-center h-screen">
        <Toaster />
        <div className="w-full rounded-lg sm:max-w-md md:mt-0 xl:p-0">
          <h2 className="font-bold text-xl text-center p-8">
            Sign in to your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col my-5 items-center">
              <InputForm
                name="username"
                placeholder="Enter your username"
                label="Username or Email Address"
                register={register}
              />
            </div>
            <div className="flex flex-col my-5 items-center">
              <InputForm
                name="password"
                type="password"
                placeholder="******"
                label="Password"
                register={register}
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline btn-primary w-full"
              disabled={state.isLoading}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

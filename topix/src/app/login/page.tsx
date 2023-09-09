"use client";

import { redirect } from "next/navigation";
import { InputForm } from "../components/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/shadcn/ui/use-toast";
import { Toaster } from "@/shadcn/ui/toaster";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) redirect("/");

  const callbackUrl = "http://localhost:3000";

  const { toast } = useToast();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      console.log("hey");
      const status = await signIn("credentials", {
        // ...data,
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (status?.ok) router.push(status.url as string);
      if (status?.error)
        toast({
          variant: "destructive",
          description: status.error || "Unexpected error",
        });
      console.log(status);
      // ! call login function here ?
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        description: error.response.data || "Unexpected error",
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
            <button
              onClick={() => signIn("google", { callbackUrl: callbackUrl })}
              className="btn btn-ghost btn-outline btn-primary"
            >
              Sign in with Google
            </button>
            <button
              onClick={() => signIn("github", { callbackUrl: callbackUrl })}
              className="btn btn-ghost btn-outline btn-primary"
            >
              Sign in with Github
            </button>
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
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

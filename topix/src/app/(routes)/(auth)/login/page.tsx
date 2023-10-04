"use client";

import { InputForm } from "../../../_components/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/shadcn/ui/use-toast";
import { Toaster } from "@/shadcn/ui/toaster";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { domain } from "@/lib/utils";

export default function Login() {
  const { data: session } = useSession();
  if (session?.user) redirect("/");

  const callbackUrl = domain;

  const { toast } = useToast();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const status = await signIn("credentials", {
      email: data.username.toLowerCase(),
      password: data.password,
      redirect: false, // Stops redirect to error page.
      callbackUrl: "/",
    });
    console.log(status);
    if (status?.error) {
      toast({
        variant: "destructive",
        description: status?.error || "Unexpected error",
      });
      return;
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
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

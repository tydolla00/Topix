"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Error() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("error");
  let text;

  if (search === "AccessDenied")
    text = "You are not authorized to sign in for some reason.";
  else if (search === "EmailAlreadyExists")
    text =
      "Email already exists, please click the button below to sign in with your email and password";
  else
    text =
      "Some unexpected error occured during login. Click the button below and try again.";

  return (
    <div className="w-screen h-screen flex flex-col space-y-4 justify-center items-center">
      <h1 className="text-center text-2xl">{text}</h1>
      <button
        className="animate-bounce btn btn-outline btn-ghost btn-secondary"
        onClick={() => router.push("/login")}
      >
        Click me
      </button>
    </div>
  );
}

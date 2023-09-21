"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Error() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("error");
  let text;

  switch (search) {
    case "AccessDenied":
      text = "You are not authorized to sign in for some reason.";
      break;
    case "OAuthAccountNotLinked":
      text = "Email already exists. Please sign in with a provider";
      break;
    case "EmailAlreadyExists":
      text =
        "Email already associated with a different account. Please sign in with the correct provider.";
      break;
    default:
      text =
        "Some unexpected error occured during login. Click the button below and try again.";
  }

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

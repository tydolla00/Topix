import { useRouteError } from "react-router-dom";
import { ErrorProps } from "../errors/errorpage";
import { useState } from "react";
import { Toaster } from "@/shadcn/ui/toaster";
import { useToast } from "@/shadcn/ui/use-toast";
// import ReactDOM from "react-dom";

export const ErrorAlert = () => {
  let routerError: ErrorProps = useRouteError() as ErrorProps;
  const [error] = useState<string | any>(routerError?.message);
  const { toast } = useToast();
  const toastIt = () => {
    toast({
      variant: "destructive",
      description: error || "An error occured",
    });
  };
  toastIt();
  return (
    <>
      <Toaster />
    </>
    // <div
    //   id="alert"
    //   className="alert alert-error md:w-1/3 w-2/3 absolute right-0 flex"
    // >
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     className="stroke-current shrink-0 h-6 w-6 cursor-pointer btn-ghost animate-pulse"
    //     fill="none"
    //     viewBox="0 0 24 24"
    //     //   onClick={() =>
    //     //     ReactDOM.unmountComponentAtNode(
    //     //       document.getElementById("alert") as HTMLElement
    //     //     )
    //     //   }
    //   >
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       strokeWidth="2"
    //       d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    //     />
    //   </svg>
    //   <span>{error}</span>
    // </div>
  );
};

"use client";

import { ToastAction } from "@/shadcn/ui/toast";
import { Toaster } from "@/shadcn/ui/toaster";
import { useToast } from "@/shadcn/ui/use-toast";
import Image from "next/image";
import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter, ourFileRouter } from "@/app/api/uploadthing/core";
import { useSession } from "next-auth/react";

export default function FileUpload() {
  const { toast } = useToast();
  const { data: session, update } = useSession();

  const [file, setFile] = useState<Blob | any>();

  return (
    <>
      <Toaster />
      <label className="label" htmlFor="file">
        File
      </label>
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          // Do something with the response
          // TODO Update User Image for session.
          if (res) {
            await update({ user: { image: res[0].url } });
            setFile(res[0].url);
          }
          toast({ description: "Success" });
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast({
            title: "Uh oh something went wrong!",
            variant: "destructive",
            description: error.message,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }}
      />
      {/* <FileInput onChange={handleChange} />
        <button
          type="submit"
          className="btn btn-ghost btn-outline"
          disabled={state.isLoading}
        >
          Submit
        </button> */}
      {file && (
        <Image src={file} width={300} height={300} alt="Uploaded file" />
      )}
    </>
  );
}

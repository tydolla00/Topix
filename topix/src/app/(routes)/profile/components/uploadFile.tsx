"use client";

import { ToastAction } from "@/shadcn/ui/toast";
import { Toaster } from "@/shadcn/ui/toaster";
import { useToast } from "@/shadcn/ui/use-toast";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { FileWithPath } from "@uploadthing/react";
import { generateReactHelpers, useDropzone } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useSession } from "next-auth/react";
import {
  UploadFileResponse,
  generateClientDropzoneAccept,
} from "uploadthing/client";
import { Button } from "@/shadcn/ui/button";

export default function FileUpload({
  fileUploaded,
  setFileUploaded,
}: {
  fileUploaded: boolean;
  setFileUploaded: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const { data: session, update } = useSession();

  const [file, setFile] = useState<File[]>([]);
  const [filePreview, setFilePreview] = useState<Blob | any>();

  const { useUploadThing } = generateReactHelpers<OurFileRouter>();

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    console.log(acceptedFiles);
    const blob = new Blob(acceptedFiles);
    const src = URL.createObjectURL(blob);
    setFilePreview(src);
    setFile(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onUploadBegin: () => {
      setFileUploaded(true);
    },
    onClientUploadComplete: () => {
      setFile([]);
      setFilePreview(null);
      setFileUploaded(false);
      toast({ description: "Success" });
    },
    onUploadError(e) {
      setFile([]);
      setFilePreview(null);
      setFileUploaded(false);
      console.log(e);
      toast({
        title: "Uh oh something went wrong!",
        variant: "destructive",
        description: e.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <>
      <Toaster />
      <div className="h-36 w-full" {...getRootProps()}>
        <input {...getInputProps()} multiple={false} />
        <p className="text-center">Drop Files here!</p>
      </div>
      <div>
        {file?.length !== 0 && (
          <button
            type="button"
            className={`btn btn-neutral ${!fileUploaded && "animate-bounce"}`}
            onClick={async () => {
              const res = await startUpload(file);
              if (res)
                update({
                  ...session,
                  user: { ...session?.user, image: res[0].url },
                });
            }}
          >
            Upload Photo.
          </button>
        )}
      </div>
      {filePreview && (
        <Image src={filePreview} height={400} width={400} alt="uploaded file" />
      )}
    </>
  );
}

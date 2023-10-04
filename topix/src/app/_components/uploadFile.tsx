"use client";

import { Toaster } from "@/shadcn/ui/toaster";
import { Dispatch, useCallback, useState } from "react";
import { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Action, useUploadReducer } from "@/app/hooks/useUploadReducer";

export default function FileUpload({
  dispatch,
}: {
  dispatch: Dispatch<Action>;
}) {
  const { permittedFileInfo } = useUploadReducer();
  const [uploaded, setUploaded] = useState(false);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    console.log(acceptedFiles);
    const blob = new Blob(acceptedFiles);
    const src = URL.createObjectURL(blob);
    dispatch({ type: "updateFile", file: acceptedFiles });
    dispatch({ type: "updatePreview", filePreview: src });
    setUploaded(true);
  }, []);

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
      <div className="h-full w-full" {...getRootProps()}>
        <input {...getInputProps()} multiple={false} />
        <p className="text-center">
          {uploaded ? "File uploaded" : "Drop Files here!"}
        </p>
      </div>
      <div></div>
    </>
  );
}

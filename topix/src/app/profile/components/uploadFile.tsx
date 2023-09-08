"use client";
import { FileInput } from "@/app/components/input";
import { UnionUserAuthData, UserAuthData } from "@/app/hooks/useAuth";
import { useMyFetch } from "@/app/hooks/useFetch";
import {
  getFromLocalStorage,
  useLocalStorage,
} from "@/app/hooks/useLocalStorage";
import { ToastAction } from "@/shadcn/ui/toast";
import { Toaster } from "@/shadcn/ui/toaster";
import { useToast } from "@/shadcn/ui/use-toast";
import Image from "next/image";
import { useState } from "react";

export default function FileUpload() {
  const storedAuthData = getFromLocalStorage<UserAuthData>("user");
  const [authData, setAuthData] = useLocalStorage<UnionUserAuthData>(
    "user",
    storedAuthData
  );
  const { toast } = useToast();

  const config = {
    headers: {
      Authorization: `Bearer ${authData?.token}`,
      "content-type": "multipart/form-data",
    },
  };
  const { state, fetchData } = useMyFetch({
    url: "http://localhost:8000/auth/upload",
    method: "POST",
    config: config,
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("name", uploadedFile.name);
      const response = await fetchData(formData);
      console.log({ response });
      const newState = storedAuthData;
      console.log({ newState });
      if (newState?.profile_picture) {
        newState.profile_picture = response;
        setAuthData(newState);
      }
      toast({ description: "Success" });
    } catch (error: any) {
      const errorMessage = state.error?.response?.data || error?.response?.data;

      toast({
        title: "Uh oh something went wrong!",
        variant: "destructive",
        description: errorMessage,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const [file, setFile] = useState<Blob | any>();
  const [uploadedFile, setUploadedFile] = useState<Blob | any>();

  const handleChange = (e: any) => {
    const blob = new Blob([e.target.files[0]]);
    const src = URL.createObjectURL(blob);
    setFile(src);
    setUploadedFile(e.target.files[0]);
    console.log(e.target.files);
    console.log(file);
  };

  return (
    <>
      <Toaster />
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label className="label" htmlFor="file">
          File
        </label>
        <FileInput onChange={handleChange} />
        <button
          type="submit"
          className="btn btn-ghost btn-outline"
          disabled={state.isLoading}
        >
          Submit
        </button>
      </form>
      {file && <Image src={file} alt="Uploaded file" />}
    </>
  );
}

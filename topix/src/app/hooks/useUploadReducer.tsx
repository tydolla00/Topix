import { generateReactHelpers } from "@uploadthing/react/hooks";
import { useReducer } from "react";
import { OurFileRouter } from "../api/uploadthing/core";
import { toast } from "@/shadcn/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export const useUploadReducer = () => {
  const { useUploadThing } = generateReactHelpers<OurFileRouter>();

  const [state, dispatch] = useReducer(reducer, {
    file: null,
    fileUploaded: false,
    filePreview: null,
    startUpload: false,
  });

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onUploadBegin: () => {
      dispatch({ type: "updateUploaded", fileUploaded: true });
    },
    onClientUploadComplete: () => {
      dispatch({ type: "updateFile", file: [] });
      dispatch({ type: "updatePreview", filePreview: null });
      dispatch({ type: "updateUploaded", fileUploaded: false });
      toast({ description: "Success" });
    },
    onUploadError(e) {
      dispatch({ type: "updateFile", file: [] });
      dispatch({ type: "updatePreview", filePreview: null });
      dispatch({ type: "updateUploaded", fileUploaded: false });
      console.log(e);
      toast({
        title: "Uh oh something went wrong!",
        variant: "destructive",
        description: e.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case "updateFile":
        return { ...state, file: action.file };
      case "updateUploaded":
        return { ...state, fileUploaded: action.fileUploaded };
      case "updatePreview":
        return { ...state, filePreview: action.filePreview };
      case "startUpload":
        return { ...state, startUpload: true };
      default:
        throw new Error("Unknown action type");
    }
  }
  return { state, dispatch, startUpload, permittedFileInfo };
};

export type State = {
  file: File[] | null;
  fileUploaded: boolean;
  filePreview?: Blob | any;
  startUpload: boolean;
};

export type Action =
  | { type: "updateFile"; file: File[] }
  | { type: "updateUploaded"; fileUploaded: boolean }
  | { type: "updatePreview"; filePreview: Blob | any }
  | { type: "startUpload"; startUpload: boolean };

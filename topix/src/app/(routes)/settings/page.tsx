"use client";
import { useUploadReducer } from "@/app/hooks/useUploadReducer";

export default function Settings() {
  const { state, dispatch } = useUploadReducer();
  console.log("Settings", state.filePreview);
  return (
    <>
      <button
        className="btn btn-ghost"
        onClick={() =>
          dispatch({
            type: "updatePreview",
            filePreview: state.filePreview + 1,
          })
        }
      >
        Settings Button
      </button>
      <Test />
      <div>Settings Page</div>
    </>
  );
}

const Test = () => {
  const { state, dispatch } = useUploadReducer();
  console.log("Test", state.filePreview);
  return (
    <button
      className="btn btn-ghost btn-primary btn-outline"
      onClick={() =>
        dispatch({ type: "updatePreview", filePreview: state.filePreview + 10 })
      }
    >
      Test Button
    </button>
  );
};

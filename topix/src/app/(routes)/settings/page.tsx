"use client";
import { useUploadReducer } from "@/app/hooks/useUploadReducer";
import { useState } from "react";

export default function Settings() {
  const { state, dispatch } = useUploadReducer();
  const data = [
    "Talk to me nicely",
    "Hello",
    "World",
    "Denis",
    "Pizza",
    "Party pooper",
    "Dummy",
  ];
  const [i, setI] = useState(0);
  const [index, setIndex] = useState(data);
  console.log("Settings", state.filePreview);
  console.log(i);
  return (
    <>
      <button
        className="btn btn-ghost"
        onClick={() => {
          setI(i + 1);
          console.log(i);
        }}
      >
        Settings Button
      </button>
      <p>{index[i]}</p>
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

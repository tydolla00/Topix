"use client";

import { editProfile } from "@/app/actions/actions";
import { useState } from "react";
import { DatePicker } from "./datepicker";
import Modal from "@/app/components/modal";
import FileUpload from "./uploadFile";

// TODO Validate Form Inputs with Schema
export const Form = ({ user }: { user: UserProps }) => {
  const [editing, setEditing] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const handleClick = () => {
    setEditing(!editing);
  };
  return (
    <form action={editProfile}>
      <button
        onClick={handleClick}
        type={editing ? "reset" : "button"}
        className={`ml-auto btn ${
          editing ? "btn-error" : "btn-success"
        }  block`}
      >
        {editing ? "Cancel" : "Edit Profile"}
      </button>
      <label htmlFor="name" className="label">
        Full Name
      </label>
      <input
        name="name"
        type="text"
        placeholder="Edit your name"
        className="input input-bordered w-full max-w-xs "
        defaultValue={
          user?.first_name && user.last_name
            ? `${user?.first_name} ${user?.last_name}`
            : ""
        }
        disabled={!editing}
      />
      <label className="label"> Username</label>
      <input
        name="username"
        type="text"
        className="input input-bordered w-full max-w-xs "
        placeholder="Edit your username"
        defaultValue={user?.username || ""}
        disabled
      />
      <label className="label">Email</label>
      <input
        name="email"
        type="email"
        className="input input-bordered w-full max-w-xs "
        defaultValue={user?.email || ""}
        disabled
      />
      <label className="label">Birthday</label>
      {editing ? (
        <DatePicker key={"birthday"} />
      ) : (
        <input
          className="input input-border w-full max-w-xs"
          disabled
          defaultValue={"Grab birthday from db"}
        />
      )}

      {/* <input
        name="birthday"
        type="date"
        className="input input-bordered w-full max-w-xs "
        disabled={!editing}
      /> */}
      <label className="label">Pronouns</label>
      <input
        name="pronounts"
        type="text"
        placeholder="Change your pronouns"
        className="input input-bordered w-full max-w-xs "
        disabled={!editing}
      />
      <div className="flex w-full">
        <button
          onClick={() => {
            let modal: any = window;
            modal.upload.showModal();
          }}
          type="button"
          className="btn btn-ghost btn-outline"
        >
          Update Profile Pic
        </button>
        <button type="submit" className="btn btn-secondary ml-auto block">
          Save Changes
        </button>
      </div>
      <Modal height="h-[600px]" className="h-60" id="upload" key={"upload"}>
        <form method="dialog">
          <h1 className="text-bold text-2xl text-center">
            Update your profile pic!
          </h1>
          <div className="border border-white h-36 w-full">
            <FileUpload
              fileUploaded={fileUploaded}
              setFileUploaded={setFileUploaded}
            />
            <button
              disabled={fileUploaded}
              className={`btn btn-error w-full my-5`}
            >
              {fileUploaded ? "Cancel?" : "Close"}
            </button>
          </div>
        </form>
      </Modal>
    </form>
  );
};

type UserProps = {
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
} | null;

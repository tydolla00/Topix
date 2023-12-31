"use client";

import { editProfile } from "@/app/actions/actions";
import { useState } from "react";
import Image from "next/image";
import Modal from "@/app/_components/modal";
import FileUpload from "../../../_components/uploadFile";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { $Enums } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shadcn/ui/tooltip";
import { SaveChangesButton, UploadProfileButton } from "./client";
import { InputFields } from "./inputFields";
import { useUploadReducer } from "@/app/hooks/useUploadReducer";
import { useSession } from "next-auth/react";

// TODO Validate Form Inputs with Schema
export const Form = ({ user }: { user: UserProps }) => {
  const today = new Date();
  const difference = Number(today) - Number(user?.updatedAt);
  const millisecondsInOneDay = 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

  const oneday = difference < millisecondsInOneDay;

  const { state, dispatch, startUpload } = useUploadReducer();
  const { data: session, update } = useSession();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("First and Last name is required")
      .matches(
        /^[A-Za-z]+( [A-Za-z]+)+$/,
        "First and Last can only contain letters and one space between words"
      ),
    username: yup.string().notRequired().default(""),
    email: yup.string().email(),
    birthday: yup.date().max(new Date()).notRequired(),
    pronouns: yup
      .mixed()
      .oneOf(["He/Him", "She/Her", "Other"] as const)
      .notRequired(),
  });
  const {
    register,
    reset,
    setValue,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name:
        user?.firstName && user.lastName
          ? `${user?.firstName} ${user?.lastName}`
          : "",
      username: user?.username,
      email: user?.email,
      birthday: user?.birthday,
      pronouns: user?.pronouns,
    },
    mode: "onChange",
  });

  const [editing, setEditing] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const input: DataProps = [
    {
      name: "name",
      type: "text",
      error: errors.name?.message,
      label: "Full Name",
      disabled: !editing,
      defaultValue:
        user?.firstName && user.lastName
          ? `${user?.firstName} ${user?.lastName}`
          : "",
    },
    { name: "username", disabled: true, defaultValue: user?.username || "" },
    {
      name: "email",
      type: "email",
      disabled: true,
      defaultValue: user?.email || "",
    },
  ];

  const handleClick = () => {
    if (oneday) return;
    if (editing) reset();
    setEditing(!editing);
  };
  return (
    <form action={editProfile}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleClick}
              type={editing ? "reset" : "button"}
              className={`ml-auto btn ${
                editing ? "btn-error" : "btn-success"
              }  block`}
            >
              {editing ? "Cancel" : "Edit Profile"}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{oneday && "Come back tomorrow to edit your profile!"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* {input.map(
        ({ defaultValue, name, label, disabled, required = false, type, error }) => (
          <>
            <label htmlFor="name" className="label">{`${
              label ? label : capitalizeFirstLetter(name)
            }`}</label>
            <Input
              register={register}
              type={type || "text"}
              defaultValue={defaultValue}
              placeholder={`Edit your ${name}`}
              disabled={disabled}
              required={required}
            />
            <div className="invalid-feedback">{error}</div>
          </>
        )
      )} */}
      <InputFields
        editing={editing}
        setValue={setValue}
        user={user}
        errors={errors}
        register={register}
      />

      <div className="flex w-full">
        <UploadProfileButton oneday={oneday} />
        {editing && (
          <SaveChangesButton
            isDirty={isDirty}
            dirtyFields={dirtyFields}
            isValid={isValid}
            reset={reset}
          />
        )}
      </div>
      <Modal height="h-[600px]" className="h-60" id="upload" key={"upload"}>
        <form method="dialog">
          <h1 className="text-bold text-2xl text-center">
            Update your profile pic!
          </h1>
          <div className="border border-white h-36 w-full">
            <FileUpload dispatch={dispatch} />

            {state.filePreview && (
              <Image
                src={state.filePreview}
                height={400}
                width={400}
                alt="uploaded file"
              />
            )}
            {state.file && state.file?.length !== 0 && (
              <button
                type="button"
                className={`btn btn-neutral ${
                  !state.fileUploaded && "animate-bounce"
                }`}
                onClick={async () => {
                  const res = await startUpload(state.file as File[]);
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

export type UserProps = {
  name: string | null;
  birthday: Date | null;
  pronouns: $Enums.Pronouns | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  username: string | null;
  updatedAt: Date | null;
} | null;

type DataProps = {
  error?: string;
  name: "name" | "email" | "username" | "birthday" | "pronouns";
  label?: string;
  required?: boolean;
  disabled: boolean;
  defaultValue: string;
  type?: "text" | "email";
}[];

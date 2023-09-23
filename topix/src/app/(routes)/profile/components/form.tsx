"use client";

import { editProfile } from "@/app/actions/actions";
import { useState } from "react";
import { DatePicker } from "./datepicker";
import Modal from "@/app/components/modal";
import FileUpload from "./uploadFile";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrors, UseFormRegister, useForm } from "react-hook-form";
import { $Enums } from "@prisma/client";
import { PronounSelect } from "./select";
import { useSession } from "next-auth/react";
import { Input } from "@/app/components/input";
import { capitalizeFirstLetter } from "@/lib/functions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shadcn/ui/tooltip";

// TODO Validate Form Inputs with Schema
export const Form = ({ user }: { user: UserProps }) => {
  const today = new Date();
  const difference = Number(today) - Number(user?.updatedAt);
  const millisecondsInOneDay = 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

  const [oneday, setOneDay] = useState<boolean>(
    difference < millisecondsInOneDay
  );

  const { data: session } = useSession();
  console.log(session);
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("First and Last name is required")
      .matches(
        /^[A-Za-z]+( [A-Za-z]+)+$/,
        "First and Last can only contain letters and one space between words"
      ),
    username: yup.string().notRequired().default(user?.username),
    email: yup.string().email(),
    birthday: yup.date().max(new Date()).notRequired(),
    pronouns: yup.mixed().oneOf(["He/Him", "She/Her", "Other"] as const),
    // .notRequired(),
  });
  const {
    register,
    reset,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name:
        user?.first_name && user.last_name
          ? `${user?.first_name} ${user?.last_name}`
          : "",
      username: user?.username,
      email: user?.email,
      birthday: user?.birthday,
      // pronouns: user?.pronouns,
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
        user?.first_name && user.last_name
          ? `${user?.first_name} ${user?.last_name}`
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

  type DataProps = {
    error?: string;
    name: "name" | "email" | "username" | "birthday" | "pronouns";
    label?: string;
    required?: boolean;
    disabled: boolean;
    defaultValue: string;
    type?: "text" | "email";
  }[];

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
            <p>Come back tomorrow to edit your profile!</p>
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
        <button
          disabled={oneday}
          onClick={() => {
            let modal: any = window;
            modal.upload.showModal();
          }}
          type="button"
          className="btn btn-ghost btn-outline"
        >
          Update Profile Pic
        </button>
        {editing && (
          <button
            disabled={!isDirty || !isValid}
            onClick={() => {
              setTimeout(() => {
                reset();
              }, 3000);
            }}
            type="submit"
            className="btn btn-secondary ml-auto block"
          >
            Save Changes
          </button>
        )}
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

const InputFields = ({
  user,
  editing,
  register,
  errors,
  setValue,
}: InputFieldsProps) => {
  const [birthday, setBirthday] = useState<Date>();

  return (
    <>
      <label htmlFor="name" className="label">
        Full Name
      </label>
      <input
        className="input input-bordered w-full max-w-xs"
        required
        placeholder="Edit your name"
        defaultValue={
          user?.first_name && user.last_name
            ? `${user?.first_name} ${user?.last_name}`
            : ""
        }
        disabled={!editing}
        {...register("name")}
      />
      <div className="invalid-feedback">{errors.name?.message}</div>
      <label className="label"> Username</label>
      <input
        className="input input-bordered w-full max-w-xs"
        {...register("username")}
        placeholder="Edit your username"
        disabled
        defaultValue={user?.username || ""}
      />
      <label className="label">Email</label>
      <input
        className="input input-bordered w-full max-w-xs"
        type="email"
        {...register("email")}
        disabled
        defaultValue={user?.email || ""}
      />

      <label className="label">Birthday</label>
      {editing ? (
        <DatePicker
          register={register}
          birthday={birthday}
          setBirthday={setBirthday}
          key={"birthday"}
        />
      ) : (
        <input
          type="date"
          className="input input-border w-full max-w-xs"
          {...register("birthday")}
          defaultValue={birthday?.toLocaleDateString()}
          disabled
          placeholder="Grab birthday from db"
        />
      )}
      <div className="invalid-feedback">{errors.birthday?.message}</div>

      <label className="label">Pronouns</label>
      <PronounSelect
        disabled={!editing}
        defaultValue={user?.pronouns}
        register={register}
        setValue={setValue}
      />

      <div className="invalid-feedback">{errors.pronouns?.message}</div>
    </>
  );
};

type UserProps = {
  name: string | null;
  birthday: Date | null;
  pronouns: $Enums.Pronouns | null;
  first_name: string | null;
  last_name: string | null;
  email: string;
  username: string | null;
  updatedAt: Date | null;
} | null;

type InputFieldsProps = {
  user: UserProps;
  editing: boolean;
  register: any;
  errors: any;
  setValue: any;
};

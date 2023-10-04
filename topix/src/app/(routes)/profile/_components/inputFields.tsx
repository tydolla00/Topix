"use client";
import { useState, useEffect } from "react";
import { DatePicker } from "../../../_components/datepicker";
import { PronounSelect } from "./select";
import { UserProps } from "./form";
import { UseFormSetValue } from "react-hook-form";
import { Maybe } from "yup";

export const InputFields = ({
  user,
  editing,
  register,
  errors,
  setValue,
}: InputFieldsProps) => {
  const [birthday, setBirthday] = useState<Date>();

  // useEffect(() => {
  //   birthday && setValue("birthday", birthday, { shouldDirty: true });
  //   return () => {};
  // }, [birthday]);

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
          user?.firstName && user.lastName
            ? `${user?.firstName} ${user?.lastName}`
            : ""
        }
        disabled={!editing}
        {...register("name")}
      />
      <div className="invalid-feedback">{errors.name?.message}</div>
      <label className="label">Username</label>
      <input
        className="input input-bordered w-full max-w-xs"
        {...register("username")}
        placeholder="Edit your username"
        disabled
        defaultValue={user?.username || "d"}
      />
      <label className="label">Email</label>
      <input
        className="input input-bordered w-full max-w-xs"
        max={30}
        type="email"
        {...register("email")}
        disabled
        defaultValue={user?.email || ""}
      />

      <label className="label">Birthday</label>
      <DatePicker
        disabled={!editing}
        register={register}
        birthday={birthday}
        setBirthday={setBirthday}
        key={"birthday"}
      />
      <input
        type="date"
        className="input input-border w-full max-w-xs hidden"
        {...register("birthday")}
        // value={birthday}
        // defaultValue={new Date()}
        disabled
        placeholder="Grab birthday from db"
      />

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

type InputFieldsProps = {
  user: UserProps;
  editing: boolean;
  register: any;
  errors: any;
  setValue: UseFormSetValue<{
    birthday?: Maybe<Date | undefined>;
    email?: string | undefined;
    pronouns?: any | undefined;
    username: string | null;
    name: string;
  }>;
};

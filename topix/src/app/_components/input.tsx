import { InputProps } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import * as React from "react";
import FileUpload from "./uploadFile";
import { Action } from "../hooks/useUploadReducer";
import { TopixFields } from "./input-client";
import { Input } from "@/shadcn/ui/input";

export const InputForm = ({
  label,
  name,
  placeholder,
  type = "text",
  required = true,
  register,
}: InputFormProps) => {
  return (
    <>
      <label className={`${required && "label-required"}`}>{label}</label>
      <input
        name={name}
        className="input input-bordered w-full max-w-xs"
        placeholder={placeholder}
        type={type}
        required={required}
        {...register(name)}
      />
    </>
  );
};

export const ValidatedFormInput = ({
  name,
  css,
  register,
  label,
  type,
  placeholder,
}: RegisterProps) => {
  return (
    <>
      <label className="label-required">{label}</label>
      <input
        className={`input input-bordered w-full max-w-xs ${css}`}
        name={name}
        placeholder={placeholder}
        type={type}
        required
        {...register(name)}
      />
    </>
  );
};

export const FileInput = React.forwardRef<
  HTMLInputElement,
  React.HTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => (
  <input
    ref={ref}
    name="file"
    type="file"
    className="file-input w-full max-w-xs"
    {...props}
  />
));
FileInput.displayName = "FileInput";

// export const Input = ({ register, ...props }: InputProps) => (
//   <input
//     className="input input-bordered w-full max-w-sm"
//     type="text"
//     {...register(props.name)}
//     {...props}
//   />
// );

export const TopixInput = ({
  control,
  getValues,
  register,
  setValue,
  errors,
  dispatch,
}: {
  control?: any;
  getValues?: any;
  register: any;
  setValue?: any;
  errors: any;
  dispatch: React.Dispatch<Action>;
}) => (
  <>
    <label className="label-required">Createdby</label>
    <Input
      {...register("createdBy")}
      className="w-full max-w-xs"
      type="text"
      placeholder="Enter username"
    />
    <p className="invalid-feedback">{errors.createdBy?.message}</p>
    <label className="label-required">Title</label>
    <Input
      {...register("title")}
      className="w-full max-w-xs"
      type="text"
      placeholder="Enter title of Game"
    />
    <p className="invalid-feedback">{errors.title?.message}</p>
    <label className="label-required">TopixId</label>
    <Input
      {...register("topixId")}
      className="w-full max-w-xs"
      type="text"
      placeholder="Enter pathname"
    />
    <p className="text-sm text-slate-400">Must be unique!</p>
    <p className="invalid-feedback">{errors.topixId?.message}</p>
    <label className="label">Icon</label>
    <div className="w-full max-w-xs border-slate-800 border rounded-md cursor-pointer">
      <FileUpload dispatch={dispatch} />
    </div>
    <p className="invalid-feedback">{errors.img?.message}</p>
    <label className="label-required">Description</label>
    <Textarea
      {...register("description")}
      placeholder="Enter the description of your topix here!"
    />
    <p className="invalid-feedback">{errors.description?.message}</p>
    <p className="text-sm text-slate-400">
      This will be the description of your topix!
    </p>
    <TopixFields
      control={control}
      getValues={getValues}
      register={register}
      errors={errors}
    />
  </>
);

export interface RegisterProps extends InputFormProps {
  name: string;
  type: "password" | "text";
  css: string;
  register: any;
}

interface InputFormProps {
  name: string;
  label: string;
  placeholder: string;
  type?: "text" | "password";
  required?: boolean;
  register?: any;
}

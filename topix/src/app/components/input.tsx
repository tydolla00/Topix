import { InputProps } from "@/shadcn/ui/input";
import * as React from "react";

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

// export const Input = React.forwardRef<
//   InputProps,
//   React.InputHTMLAttributes<HTMLInputElement>
// >(({...props }) => (
//   <input
//     className="input input-bordered w-full max-w-sm"
//     type="text"
//     {...props}
//   />
// ));

export const Input = ({ register, ...props }: InputProps) => (
  <input
    className="input input-bordered w-full max-w-sm"
    type="text"
    {...register(props.name)}
    {...props}
  />
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

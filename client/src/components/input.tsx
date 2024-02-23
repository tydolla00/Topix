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
        // className="focus:ring-blue-600 focus:border-blue-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
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

export const FileInput = ({ ...props }) => {
  return (
    <input
      accept="image/png, image/gif, image/jpeg"
      capture
      name="file"
      type="file"
      className="file-input w-full max-w-xs"
      {...props}
    />
  );
};
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

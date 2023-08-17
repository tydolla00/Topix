export const InputForm = ({
  label,
  placeholder,
  type = "text",
  required = true,
}: InputFormProps) => {
  return (
    <>
      <label
        className={`${
          required && "after:content-['*'] after:ml-0.5 after:text-red-500"
        }`}
      >
        {label}
      </label>
      <input
        name={label.split(" ").join("").toLowerCase()}
        className="input input-bordered w-full max-w-xs"
        // className="focus:ring-blue-600 focus:border-blue-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
        placeholder={placeholder}
        type={type}
        required={required}
      />
    </>
  );
};

export const RegisterInputForm = ({
  name,
  css,
  register,
  label,
  type,
  placeholder,
}: RegisterProps) => {
  return (
    <>
      <label className="after:content-['*'] after:ml-0.5 after:text-red-500">
        {label}
      </label>
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
  label: string;
  placeholder: string;
  type?: "text" | "password";
  required?: boolean;
}

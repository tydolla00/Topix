export const InputForm = ({ label, placeholder }: InputFormProps) => {
  return (
    <>
      <label className="dark:text-white text-black after:content-['*'] after:ml-0.5 after:text-red-500">
        {label}
      </label>
      <input
        className="rounded p-1 text-black"
        placeholder={placeholder}
        type="text"
        required
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
      <label className="dark:text-white text-black after:content-['*'] after:ml-0.5 after:text-red-500">
        {label}
      </label>
      <input
        className={`rounded p-1 text-black ${css}`}
        name={name}
        placeholder={placeholder}
        type={type}
        required
        {...register(name)}
      />
    </>
  );
};
interface RegisterProps extends InputFormProps {
  name: string;
  type: string;
  css: string;
  register: any;
}

interface InputFormProps {
  label: string;
  placeholder: string;
}

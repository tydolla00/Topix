import { RegisterInputForm } from "../components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function Register() {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required(),
    username: Yup.string()
      .required("Username is required ")
      .min(6, "Username must be at least 6 characters")
      .max(26, "Username must not be more than 26 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters "),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });
  const data = [
    {
      name: "username",
      type: "text",
      css: `${errors.username && "is-invalid"}`,
      message: errors.username?.message,
      label: "Username",
      placeholder: "Enter your username",
    },
    {
      name: "email",
      type: "text",
      css: `${errors.email && "is-invalid"}`,
      message: errors.email?.message,
      label: "Email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      type: "password",
      css: `${errors.password && "is-invalid"}`,
      message: errors.password?.message,
      label: "Password",
      placeholder: "*****",
    },
    {
      name: "confirmPassword",
      type: "password",
      css: `${errors.confirmPassword && "is-invalid"}`,
      message: errors.confirmPassword?.message,
      label: "Confirm Password",
      placeholder: "*****",
    },
  ];
  const onSubmit = (data: any, e: any) => {};
  return (
    <>
      <div className="max-w-[80vw] my-0 mx-auto">
        <h2 className="text-3xl text-center mt-3">Create your account</h2>
        <p className="text-gray-500 text-center">
          Join the community and create Topix for everyone to enjoy.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between my-3">
            <div className="flex flex-col">
              <RegisterInputForm
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
                register={register}
                type="text"
                css={`
                  ${errors.firstName && "is-invalid"}
                `}
              />
              <div className="invalid-feedback">
                {errors.firstName?.message}
              </div>
            </div>
            <div className="flex flex-col">
              <RegisterInputForm
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
                register={register}
                type="text"
                css={`
                  ${errors.lastName && "is-invalid"}
                `}
              />
              <div className="invalid-feedback">{errors.lastName?.message}</div>
            </div>
          </div>
          {data.map((item) => (
            <div className="flex flex-col my-3">
              <RegisterInputForm
                name={item.name}
                label={item.label}
                placeholder={item.placeholder}
                register={register}
                type={item.type}
                css={item.css}
              />
              <div className="invalid-feedback">{item.message}</div>
            </div>
          ))}
          <button className="mx-auto bg-sky-400 p-4 rounded" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

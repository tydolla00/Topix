import { ValidatedFormInput } from "../components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useToast } from "@/shadcn/ui/use-toast";
import { Toaster } from "@/shadcn/ui/toaster";
import { useMyFetch } from "@/hooks/useFetch";

export default function Register() {
  const { toast } = useToast();
  const { state, fetchData } = useMyFetch({
    url: "http://localhost:8000/auth/signup",
    method: "POST",
  });

  // TODO Work with loading state. Loading sign.
  // * const [isLoading, setIsLoading] = useState(false);

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
  const data: {
    name: string;
    type: "text" | "password";
    css: string;
    message: string | undefined;
    label: string;
    placeholder: string;
  }[] = [
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
  const onSubmit = async (data: any) => {
    const firstName = data.firstName.replaceAll(" ", "").toLowerCase();
    const lastName = data.lastName.replaceAll(" ", "").toLowerCase();
    const username = data.username.replaceAll(" ", "").toLowerCase();
    const password = data.password;
    const email = data.email.toLowerCase();
    try {
      await fetchData({ firstName, lastName, username, password, email });
      toast({ description: "Successfully signed up" });
    } catch (error: any) {
      toast({ variant: "destructive", description: error.response.data });
    }
  };
  return (
    <>
      <div className="max-w-[80vw] my-0 mx-auto">
        <Toaster />
        <div className="hero-content flex-col md:flex-row">
          <div>
            <h2 className="text-3xl text-center mt-3">Create your account</h2>
            <p className="text-gray-500 text-center">
              Join the community and create Topix for everyone to enjoy.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex my-3">
              <div className="flex flex-col">
                <ValidatedFormInput
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
                <ValidatedFormInput
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                  register={register}
                  type="text"
                  css={`
                    ${errors.lastName && "is-invalid"}
                  `}
                />
                <div className="invalid-feedback">
                  {errors.lastName?.message}
                </div>
              </div>
            </div>
            {data.map((item) => (
              <div key={item.name} className="flex flex-col my-3">
                <ValidatedFormInput
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
            <button
              className="btn btn-outline btn-primary mx-auto w-full"
              type="submit"
              disabled={state.isLoading}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

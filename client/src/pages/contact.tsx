import { ValidatedFormInput } from "../components/input";
import Ty from "../assets/ty.png";
import { useMyFetch } from "@/hooks/useFetch";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Toaster } from "@/shadcn/ui/toaster";
import { useToast } from "@/shadcn/ui/use-toast";
// import { Select, SelectTrigger, SelectValue } from "@/shadcn/ui/select";
import { ToastAction } from "@/shadcn/ui/toast";

export default function Contact() {
  return (
    <>
      <div className="max-w-[80vw] my-0 mx-auto hero">
        <Toaster />
        <div className="hero-content flex-col md:flex-row">
          <div className="text-2xl uppercase mx-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-rose-500 my-4 flex-1">
            Please fill out this form to suggest any changes, report bugs, or
            tell me about your experience!
            <img className="md:max-h-none mx-auto max-h-48" src={Ty} />
          </div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}

// const SelectOption = () => {
//   return (
//     <Select>
//       <SelectTrigger>
//         <SelectValue placeholder="Select an option" />
//       </SelectTrigger>
//     </Select>
//   );
// };

const ContactForm = () => {
  const { state, fetchData } = useMyFetch({
    url: "http://localhost:8000/users/contact",
    method: "POST",
  });
  const { toast } = useToast();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    subject: Yup.string().required("Please select an option"),
    message: Yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();
    await fetchData(data);
    if (state.error) {
      toast({
        title: "Uh oh! Something went wrong",
        description: state.error.message,
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    toast({ description: "Thanks for submitting" });
  };
  return (
    <form className="flex-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="sm:flex justify-between">
        <div className="flex flex-col my-4">
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
          <div className="invalid-feedback">{errors.firstName?.message}</div>
        </div>
        <div className="flex flex-col my-4">
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
          <div className="invalid-feedback">{errors.lastName?.message}</div>
        </div>
      </div>
      <div className="flex flex-col my-4">
        <ValidatedFormInput
          name="email"
          label="Email"
          placeholder="Enter your email"
          register={register}
          type="text"
          css={`
            ${errors.email && "is-invalid"}
          `}
        />
        <div className="invalid-feedback">{errors.email?.message}</div>
      </div>
      <div className="flex flex-col my-4">
        <label className="label-required">Subject</label>
        <select
          required
          className="select w-full max-w-xs select-bordered"
          placeholder="Choose an option"
          {...register("subject")}
        >
          <option disabled value={0}>
            Choose an option
          </option>
          <option value="Bug Fixes">Bug Fixes</option>
          <option value="Suggestions">Suggestions</option>
          <option value="Experience">Talk to me about your experience</option>
          <option value="Other">Other</option>
        </select>
        <div className="invalid-feedback">{errors.subject?.message}</div>
      </div>
      <label className="after:content-['*'] after:ml-0.5 after:text-red-500">
        Message
      </label>
      <textarea
        required
        className="textarea textarea-bordered w-full"
        {...register("message")}
      />
      <div className="invalid-feedback">{errors.firstName?.message}</div>
      <button className="btn btn-outline btn-primary btn-block" type="submit">
        Submit
      </button>
    </form>
  );
};

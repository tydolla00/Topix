import { InputForm } from "../components/input";
import useFetch from "../hooks/useFetch";

export default function Contact() {
  const { data, loading, error } = useFetch("Say", "GET");
  console.log({ data }, { loading }, { error });
  return (
    <>
      <div className="max-w-[80vw] my-0 mx-auto">
        <div className="text-2xl uppercase mx-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-rose-500 my-4">
          Please fill out this form to suggest any changes, report bugs, or tell
          me about your experience!
        </div>
        <form>
          <div className="flex justify-between my-3">
            <div className="flex flex-col">
              <InputForm
                label="First Name"
                placeholder="Enter your first name"
              />
            </div>
            <div className="flex flex-col">
              <InputForm label="Last Name" placeholder="Enter your last name" />
            </div>
          </div>
          <div className="flex flex-col my-3">
            <InputForm label="Email" placeholder="Enter your email" />
          </div>
          <div className="flex flex-col my-3">
            <label className="dark:text-white text-black">Subject</label>
            <select
              required
              name="subject"
              className="rounded-md text-black p-2"
            >
              <option value="Bug Fixes">Bug Fixes</option>
              <option value="Suggestions">Suggestions</option>
              <option value="Experience">
                Talk to me about your experience
              </option>
              <option value="Other">Other</option>
            </select>
          </div>
          <label className="dark:text-white text-black after:content-['*'] after:ml-0.5 after:text-red-500">
            Message
          </label>
          <textarea required className="w-full h-24 text-black rounded" />
          <button className="mx-auto bg-sky-400 p-4 rounded" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

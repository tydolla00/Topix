import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: ErrorProps = useRouteError() as ErrorProps;
  let navigate = useNavigate();
  console.error(error);
  return (
    <div className="flex justify-center items-center h-screen text-white">
      <div>
        <h1 className="text-4xl mb-4">{error.status}</h1>
        <h2>{error.statusText}</h2>
        <i>{error.data}</i>
        <p>Click the button below to navigate back to the home page</p>
        <button onClick={() => navigate("/home")} className="btn btn-primary">
          Click me
        </button>
      </div>
    </div>
  );
}

type ErrorProps = {
  data: string;
  status: number;
  statusText: string;
};

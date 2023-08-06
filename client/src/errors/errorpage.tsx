import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

export default function ErrorPage() {
  const error: ErrorProps = useRouteError() as ErrorProps;
  let navigate = useNavigate();
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      error.message = "This page does not exist";
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  console.error(error);
  return (
    <div className="flex justify-center items-center h-screen text-white text-center">
      <div>
        <h1 className="text-4xl mb-4">Oops an error occured!</h1>
        <h1 className="text-4xl mb-4">
          {error?.status} {error?.statusText}
        </h1>
        <i>{error?.message}</i>
        <p>Click the button below to navigate back to the home page</p>
        <button
          onClick={() => navigate("/home")}
          className="btn btn-primary animate-bounce block mx-auto mt-4"
        >
          Click me
        </button>
      </div>
    </div>
  );
}

export type ErrorProps = null | {
  message: string;
  status: number;
  statusText: string;
};

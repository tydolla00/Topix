import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import ErrorPage from "./errors/errorpage";
import Navbar from "./components/navbar";
import Contact from "./pages/contact";
import Quizzes from "./pages/quizzes";
import Topics from "./pages/topics";
import ParallaxEffect from "./components/parallax";
import { ParallaxProvider } from "react-scroll-parallax";
import { useEffect } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import { getUsers } from "./data/loaders";
import { ProtectedLayout } from "./components/protectedRoute";
import Profile from "./pages/profiles";
import { action as LoginAction } from "./data/actions";
import { useAuth } from "./hooks/useAuth";
import { themeChange } from "theme-change";
import { ErrorAlert } from "./components/alert";
import Movies from "./pages/movies";
import Television from "./pages/tv";
import Gaming from "./pages/gaming";

function App() {
  const { login } = useAuth();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add(localStorage.theme);
    themeChange(false);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: (
            <ParallaxProvider>
              <ParallaxEffect />
            </ParallaxProvider>
          ),
        },
        { path: "home", element: <Home /> },
        { path: "quizzes", element: <Quizzes /> },
        {
          path: "topics",
          element: <Topics />,
          loader: getUsers,
        },
        { path: "movies", element: <Movies /> },
        { path: "tv", element: <Television /> },
        { path: "gaming", element: <Gaming /> },
        { path: "contact", element: <Contact /> },
        {
          path: "login",
          element: <Login />,
          action: LoginAction(login),
          // Switch on Error.status in component.
          errorElement: (
            <>
              <ErrorAlert />
              <Login />
            </>
          ),
        },
        { path: "register", element: <Register /> },
        {
          element: <ProtectedLayout />, // Protected Routes
          children: [{ path: "/profile", element: <Profile /> }],
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

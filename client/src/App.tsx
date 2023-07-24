import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import ErrorPage from "./components/errorpage";
import Navbar from "./components/navbar";
import Contact from "./pages/contact";
import Quizzes from "./pages/quizzes";
import Topics from "./pages/topics";
import ParallaxEffect from "./components/parallax";
import { ParallaxProvider } from "react-scroll-parallax";
import { useEffect } from "react";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add(localStorage.theme);
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
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "quizzes",
          element: <Quizzes />,
        },
        {
          path: "topics",
          element: <Topics />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
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

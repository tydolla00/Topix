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

function App() {
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

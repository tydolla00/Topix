import { Link, Outlet } from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between text-white">
        <div className="text-xl font-extrabold">
          To<span className="text-sky-300">pix</span>
        </div>
        <ul className="flex gap-3 justify-center">
          <li>
            <Link
              className="cursor-pointer hover:font-extrabold hover:text-sky-300"
              to="/home"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="cursor-pointer hover:font-extrabold hover:text-sky-300"
              to="/quizzes"
            >
              Quizzes
            </Link>
          </li>
          <li>
            <Link
              className="cursor-pointer hover:font-extrabold hover:text-sky-300"
              to="/topics"
            >
              Topics
            </Link>
          </li>
          <li>
            <Link
              className="cursor-pointer hover:font-extrabold hover:text-sky-300"
              to="/contact"
            >
              Contact
            </Link>
          </li>
        </ul>
        <div className="flex gap-3">
          <button>Login</button>
          <button>Register</button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

import { Link, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import DarkModeSwitcher from "./darkmodeswitcher";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div>
      <nav className="flex justify-around text-black dark:text-white">
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
        <div
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="sm:hidden text-2xl cursor-pointer"
        >
          <GiHamburgerMenu />
        </div>
        <div className="hidden sm:flex gap-3">
          <Link to="/login">
            <div>Login</div>
          </Link>
          <Link to="/register">
            <div>Register</div>
          </Link>
        </div>
      </nav>
      {isNavOpen && (
        <>
          <ul className="absolute right-0 w-40 text-md text-center text-black bg-white z-10 p-2 divide-y divide-black shadow-lg rounded-sm">
            <Link to="/profile">
              <li className="p-2 hover:bg-gray-200 cursor-pointer">
                My Account
              </li>
            </Link>
            <Link to="/settings">
              <li className="p-2 hover:bg-gray-200 cursor-pointer">Settings</li>
            </Link>
            <DarkModeSwitcher />
            <Link className="" to="/login">
              <li className="p-2 hover:bg-gray-200 cursor-pointer">Login</li>
            </Link>
            <Link to="/register">
              <li className="p-2 hover:bg-gray-200 cursor-pointer">Register</li>
            </Link>
          </ul>
        </>
      )}
      <Outlet />
    </div>
  );
}

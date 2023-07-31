import { Link, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import DarkModeSwitcher from "./darkmodeswitcher";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <nav className="navbar bg-base-100">
        <div className="navbar-start text-lg sm:text-2xl font-extrabold normal-case btn btn-ghost flex-auto">
          <span className="bg-gradient-to-r from-base-content to-70% to-primary text-transparent bg-clip-text">
            Topix
          </span>
        </div>
        <div className="navbar-center text-md flex-none">
          <ul className="menu menu-horizontal px-1 md:text-lg">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/quizzes">Quizzes</Link>
            </li>
            <li>
              <details>
                <summary>Topics</summary>
                <ul className="p-2 bg-base-100 z-[1]">
                  <li>
                    <Link to="/movies">Movies</Link>
                  </li>
                  <li>
                    <Link to="">Television</Link>
                  </li>
                  <li>
                    <Link to="">Gaming</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => {
              let modal: any = window;
              modal.search_modal.showModal();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <div className="dropdown dropdown-end">
            <label className="btn btn-circle btn-ghost text-2xl" tabIndex={0}>
              <GiHamburgerMenu />
            </label>
            <ul
              tabIndex={0}
              className="shadow menu dropdown-content z-[1] bg-base-100 rounded-box p-2"
            >
              <li>
                <Link to="/profile">My Profile</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </div>
          <dialog
            id="search_modal"
            className="modal modal-bottom sm:modal-middle"
          >
            <form className="modal-box" method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <h3 className="font-bold text-lg">Type something</h3>
              <p className="py-4">Or press esc to exit</p>
              <div className="modal-action">
                <button className="btn">Close</button>
              </div>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </nav>
      {/* <nav className="flex justify-around text-black dark:text-white">
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
      </nav> */}
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
    </>
  );
}

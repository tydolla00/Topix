import { Link, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import DarkModeSwitcher from "./darkmodeswitcher";
import Footer from "./footer";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="overflow-x-hidden">
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
                    <Link to="/tv">Television</Link>
                  </li>
                  <li>
                    <Link to="/gaming">Gaming</Link>
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
            {/* <label className="btn btn-circle btn-ghost text-2xl" tabIndex={0}>
              <GiHamburgerMenu />
            </label> */}
            <label
              className="btn btn-circle group swap swap-active swap-rotate"
              tabIndex={0}
            >
              {/* hamburger icon */}
              <svg
                className="group-focus-within:hidden fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>

              {/* close icon */}
              <svg
                className="hidden group-focus-within:block fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
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
      <Outlet />
      <Footer />
    </div>
  );
}

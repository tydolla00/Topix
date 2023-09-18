"use client";
import Link from "next/link";
// import DarkModeSwitcher from "./darkmodeswitcher";
import ProfilePicture from "./profilePicture";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

export default function Navbar() {
  const { data: session, update } = useSession();
  return (
    <div>
      <nav className="navbar bg-base-100">
        <div className="navbar-start text-sm sm:text-2xl font-extrabold normal-case flex-auto">
          <span className="bg-gradient-to-r from-base-content to-70% to-primary text-transparent bg-clip-text">
            Topix
          </span>
        </div>
        <div className="navbar-center flex-none">
          <ul className="menu menu-horizontal px-1 sm:text-lg text-xs">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/quizzes">Quizzes</Link>
            </li>
            <li>
              <details>
                <summary>Topics</summary>
                <ul className="p-2 bg-base-100 z-[1]">
                  <li>
                    <Link href="/movies">Movies</Link>
                  </li>
                  <li>
                    <Link href="/tv">Television</Link>
                  </li>
                  <li>
                    <Link href="/gaming">Gaming</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {!session?.user && (
            <>
              <Link href="/login">
                <button className="btn hidden md:block">Login</button>
              </Link>
              <Link href="/register">
                <button className="btn btn-outline btn-primary hidden md:block ml-2">
                  Register
                </button>
              </Link>
            </>
          )}
          <button
            className="lg:mx-6 sm:mx-3 sm:block hidden "
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
            {session?.user ? (
              <div tabIndex={0} className="avatar online btn btn-circle">
                <div className="rounded-full w-10">
                  <ProfilePicture img={session.user.image as string} />
                  {/* {session.user.image ? (
                    <ProfilePicture img={session.user.image} />
                  ) : (
                    //TODO Handle null profile pic here, skeleton.
                    <p>T</p>
                  )} */}
                </div>
              </div>
            ) : (
              <label
                className="btn btn-circle btn-ghost group swap swap-active swap-rotate"
                tabIndex={0}
              >
                {/* hamburger icon */}
                <svg
                  className="group-focus-within:hidden h-7 w-7 fill-current"
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
            )}
            <ul
              tabIndex={0}
              className="shadow menu dropdown-content z-[1] bg-base-100 rounded-box p-2"
            >
              {session?.user ? (
                <>
                  <li>
                    <Link href="/profile">My Profile</Link>
                  </li>
                  <li>
                    <Link href="/admin">Admin Dashboard</Link>
                  </li>
                  <li>
                    <div onClick={() => signOut()}>Log out</div>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/register">Register</Link>
                  </li>
                  <li
                    className="sm:hidden"
                    onClick={() => {
                      let modal: any = window;
                      modal.search_modal.showModal();
                    }}
                  >
                    <button>Search</button>
                  </li>
                </>
              )}
              <li>
                <Link href="/settings">Settings</Link>
              </li>
              {/* <DarkModeSwitcher /> */}
              {/* <li>
                <div className="flex">
                  <div>Dark Mode</div>
                  <label className="swap swap-rotate">

                    <input type="checkbox" />
                    <svg
                      className="swap-on fill-current w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>
                    <svg
                      className="swap-off fill-current w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                  </label>
                </div>
              </li> */}
            </ul>
          </div>
          <Modal />
        </div>
      </nav>
    </div>
  );
}

const Modal = () => {
  return (
    <dialog id="search_modal" className="modal modal-bottom sm:modal-middle">
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
  );
};

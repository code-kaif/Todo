import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../main";
import Logout from "../pages/Logout";

function Navbar() {
  const { user } = useContext(MyContext);
  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </>
  );
  return (
    <>
      <div
        className={"max-w-screen-2xl h-[10vh] container mx-auto md:px-20 px-1"}
      >
        <div className="navbar ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
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
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dark:bg-slate-800 dark:text-white menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItems}
              </ul>
            </div>
            <Link
              to={"/"}
              className="md:ml-1 ml-10 text-4xl font-bold cursor-pointer"
            >
              Todo
            </Link>
          </div>
          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 font-semibold text-lg">
                {navItems}
              </ul>
            </div>

            <div>
              {user ? (
                <Logout />
              ) : (
                <Link
                  to={"/login"}
                  className="bg-black font-semibold text-lg text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

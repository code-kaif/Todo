import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { appURL, MyContext } from "../main";

const Logout = () => {
  const { isAuth, setIsAuth } = useContext(MyContext);
  async function logoutHandler() {
    await axios
      .get(`${appURL}/user/logout`)
      .then((res) => {
        localStorage.removeItem("User");
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        toast.error("Internal Error");
        setIsAuth(true);
        console.log(err);
      });
  }

  return (
    <div>
      <Link
        onClick={logoutHandler}
        className="bg-red-600 font-semibold text-lg text-white px-3 py-2 rounded-md hover:bg-red-800 duration-300 cursor-pointer"
      >
        Logout
      </Link>
    </div>
  );
};

export default Logout;

import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { appURL, MyContext } from "../main";

function Login() {
  const { isAuth, setIsAuth } = useContext(MyContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await axios
      .post(`${appURL}/user/login`, userInfo, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("User", JSON.stringify(res.data.user));
        toast.success(res.data.message);
        setIsAuth(true);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        setIsAuth(false);
        toast.error("Invalid Email or Password");
        console.log(err);
      });
  };
  if (isAuth) return <Navigate to={"/"} />;
  return (
    <>
      <div className="h-[90vh] flex flex-col justify-center items-center">
        {" "}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-[1px] border-black rounded-md space-y-3 px-6 py-3 w-72 md:w-96"
        >
          <h1 className="text-3xl font-semibold text-center">Login</h1>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-red-600 mt-5">This field is required</span>
          )}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && (
            <span className="text-red-600 mt-5">This field is required</span>
          )}
          <div className="flex justify-between font-medium items-center">
            <p>
              New user?{" "}
              <Link
                to={"/signup"}
                className="text-blue-600 cursor-pointer underline"
              >
                Signup
              </Link>
            </p>
            <input
              type="submit"
              value="Login"
              className="px-3 py-2 bg-slate-700 hover:bg-slate-900 cursor-pointer text-white rounded-md"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Todoitem from "./Todoitem";
import { appURL } from "../main";

const Home = () => {
  const [task, setTask] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${appURL}/task/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };
  async function deleteHandler(id) {
    await axios
      .delete(`${appURL}/task/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        console.log(id);
        setRefresh((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Error");
      });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      title: data.title,
      description: data.description,
    };
    await axios
      .post(`${appURL}/task/new`, userInfo, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("Task", JSON.stringify(res.data.task));
        toast.success(res.data.message);
        console.log(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        toast.error("Intarnal Error");
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(
        `${appURL}/task/get`,

        {
          withCredentials: true,
        }
      )
      .then((res) => {
        localStorage.getItem("Task");
        setTask(res.data.task);
        console.log(res.data.task);
      })
      .catch((err) => {
        toast.error("Login Plz...");
        console.log(err);
      });
  }, [refresh]);

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" space-y-4 w-full flex flex-col justify-center items-center"
        >
          <h1 className="text-3xl font-semibold">Add Todo</h1>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-[90%] md:w-[30%]"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-600 mt-5">This field is required</span>
          )}
          <input
            type="text"
            placeholder="Description"
            className="input input-bordered w-[90%] md:w-[30%]"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-600 mt-5 text-start">
              This field is required
            </span>
          )}
          <button className="px-4 py-3 rounded-md font-medium text-slate-200 bg-slate-700 duration-300 hover:bg-slate-200 hover:text-slate-700 w-[90%] md:w-[30%]">
            Add Task
          </button>
        </form>
        {task.map((data) => (
          <Todoitem
            key={data.id}
            title={data.title}
            description={data.description}
            isCompleted={data.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={data._id}
          />
        ))}
      </div>
    </>
  );
};

export default Home;

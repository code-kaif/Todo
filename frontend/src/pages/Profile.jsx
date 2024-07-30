import React, { useContext } from "react";
import { MyContext } from "../main";
import userImg from "../../public/user.png";

const Profile = () => {
  const { user } = useContext(MyContext);
  return (
    <>
      <div className="h-[90vh] flex justify-center items-center">
        <div className="card bg-base-100 w-96 shadow-2xl">
          <div className="card-body w-[100%] h-[100%] flex flex-col justify-center items-center">
            <img src={userImg} alt="" className="w-[50%] h-[50%]" />
            <h2 className="card-title">Name : {user.name}</h2>
            <h2 className="card-title">Email : {user.email}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

import React from "react";
import { MdDelete } from "react-icons/md";

const Todoitem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center mt-5 space-y-3">
        <div className="h-[10vh] w-[90%] md:w-[30%] border-[3px] rounded-md px-3 py-1 flex items-center justify-between">
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-[0.9rem]">{description}</p>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <input
              type="checkbox"
              onChange={() => updateHandler(id)}
              checked={isCompleted}
              className="w-4 h-4"
            />
            <button onClick={() => deleteHandler(id)}>
              <MdDelete size={25} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todoitem;

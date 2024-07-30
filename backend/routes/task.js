import e from "express";
import {
  deleteTask,
  getTask,
  newTask,
  updateTask,
} from "../controller/task.js";
import { isAuth } from "../utils/auth.js";

const taskRouter = e.Router();

taskRouter
  .get("/get", isAuth, getTask)
  .post("/new", isAuth, newTask)
  .put("/:id", isAuth, updateTask)
  .delete("/:id", isAuth, deleteTask);

export default taskRouter;

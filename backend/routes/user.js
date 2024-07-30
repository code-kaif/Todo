import e from "express";
import { login, logout, profile, signup } from "../controller/user.js";
import { isAuth } from "../utils/auth.js";

const userRouter = e.Router();

userRouter
  .post("/signup", signup)
  .post("/login", login)
  .get("/me", isAuth, profile)
  .get("/logout", logout);

export default userRouter;

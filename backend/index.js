import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Todo",
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/user", userRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.listen(process.env.PORT, () => console.log("Server is Running"));

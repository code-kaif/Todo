import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(400).json({
      message: "Login Plz...",
    });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
};

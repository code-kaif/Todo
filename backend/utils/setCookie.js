import jwt from "jsonwebtoken";

export const createCookie = (user, res) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    maxAge: 15 * 60 * 1000,
    httpOnly: true,
    secure: true,
  });
};

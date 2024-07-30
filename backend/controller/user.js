import User from "../model/user.js";
import bcryptjs from "bcryptjs";
import { createCookie } from "../utils/setCookie.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.json({ message: "Plz enter all details" });
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        message: "User Already Exist",
      });
    const hashPassword = await bcryptjs.hash(password, 10);
    user = await User.create({ name, email, password: hashPassword });
    createCookie(user, res);
    res.status(201).json({
      message: "User Created",
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ message: "Plz enter all details" });
    let user = await User.findOne({ email });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!user || !isMatch)
      return res.status(400).json({
        message: "Invalid email or password",
      });
    createCookie(user, res);
    res.status(201).json({
      message: `Welcome Dear ${user.name}`,
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const profile = (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      message: "Logout Successfull",
    });
};

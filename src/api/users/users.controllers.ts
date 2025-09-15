import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";
import { hashPassword } from "../../utils/hashPassword";
import { generateToken } from "../../utils/jwt";

export const signup: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, email, confirmPassword } = req.body;
    if (!username || !password || !email || !confirmPassword) {
      return next({
        status: 400,
        message: "all feild required",
      });
    }
    if (password !== confirmPassword) {
      return next({
        status: 400,
        message: "password not matched with confirm password",
      });
    }
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return next({
        status: 400,
        message: "username already exists",
      });
    }
    const emaiExists = await User.findOne({ email });
    if (emaiExists) {
      return next({ status: 400, message: "email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = generateToken(newUser.username, newUser.id, newUser.email);
    console.log("username", newUser.username);

    console.log("generated token", token);

    res.status(201).json({
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next({
        status: 400,
        message: " username and password are required",
      });
    }
    // user by username
    const user = await User.findOne({ username }).select(
      "password username email"
    );
    if (!user || typeof user.password !== "string") {
      return next({ status: 400, message: "invalid credentials" });
    }
    console.log(user);
    console.log(password);
    // comparing pass
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next({
        status: 400,
        message: "invalid credentials",
      });
    }
    // genereate token
    const token = generateToken(user.username, user.id, user.email);
    res.json({
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().select("password");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  return res.status(200).json({
    username: user?.username,
    email: user?.email,
  });
};

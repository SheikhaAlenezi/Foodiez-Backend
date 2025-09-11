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
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return next({
        status: 400,
        message: "username or password  or email missing",
      });
    }
    const usernameExists = await User.findOne({
      $or: [{ username }, { email }],
    }).select("password");
    if (usernameExists) {
      return next({
        status: 400,
        message: "username or email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = generateToken(newUser.username, newUser.id);
    console.log("New user ID:", newUser.id);
    console.log("generated token", token);

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
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
    const token = generateToken(user.username, user.id);
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
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

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
    const { username, password } = req.body;
    if (!username || !password) {
      return next({
        statuse: 400,
        message: "username or password missing",
      });
    }
    const usernameExists = await User.findOne({ username }).select("password");
    if (usernameExists) {
      return next({
        status: 400,
        message: "username already exists",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ username, password: hashedPassword });
    const token = generateToken(username, newUser.id);
    console.log("New user ID:", newUser.id);
    console.log("generated token", token);

    res.status(201).json({ token });
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
        message: "invalid credentials",
      });
    }
    const user = await User.findOne({ username }).select("password");
    if (!user || typeof user.password !== "string") {
      return next({ status: 400, message: "invalid credentials" });
    }
    console.log(user);
    console.log(password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next({
        status: 400,
        message: "invalid credentials",
      });
    }
    const token = generateToken(username, user.id);
    res.json({ token });
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
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

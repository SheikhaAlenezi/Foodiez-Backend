import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { JWT_SECRET, JWT_EXP } from "../config/database";

interface ITokenPayload {
  _id: string;
  username: string;
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res
        .status(401)
        .json({ message: "not authorized , missing authorization headers" });
      return;
    }

    const [_, token] = authHeader.split(" ");

    if (!token) {
      return next({ status: 401, message: "invalid" });
    }
    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    const { _id } = decodedToken;
    const user = await User.findById(_id);

    if (!user) {
      return next({
        status: 401,
        message: "not authorized,missing auth headers",
      });
    }

    req.user = user;

    console.log(decodedToken);

    next();
  } catch (err) {
    console.log(err);
    return next({
      status: 401,
      message: "invalid signature",
    });
  }
};

import { JWT_SECRET, JWT_EXP } from "../config/database";
import jwt from "jsonwebtoken";

export const generateToken = (username: string, id: string) => {
  const payload = {
    _id: id,
    username,
  };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXP,
  } as jwt.SignOptions);
  console.log("generated token inside jwt", token);
  return token;
};

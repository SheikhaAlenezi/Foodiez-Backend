import { NextFunction, Request, Response } from "express";
import Category from "../../models/Category";

export const createList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await Category.create({ ...req.body });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

export const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find().populate("recipe");
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

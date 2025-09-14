import { NextFunction, Request, Response } from "express";
import Category from "../../models/Category";

export const createList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, color, icon } = req.body;
    if (!name) {
      return res.status(400).json({ message: "category name is required" });
    }
    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const category = new Category({ name, description, color, icon });
    await category.save();
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
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

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
    const normalName = name.trim().toLowerCase();

    const existing = await Category.findOne({ name: normalName });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const category = new Category({
      name: normalName,
      description,
      color,
      icon,
    });
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

export const getRecipesByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate("recipe");
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category.recipe);
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    next(err);
  }
};

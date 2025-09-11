import { NextFunction, Request, Response } from "express";
import Recipe from "../../../models/Recipe";
import Category from "../../../models/Category";

export const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, instructions, categoryId, userId } = req.body;

  try {
    const recipe = new Recipe({
      title,
      instructions,
      category: categoryId,
      user: userId,
    });
    await recipe.save();

    res.status(201).json({ message: "recipe created", recipe });
  } catch (err) {
    res.status(500).json({ message: "error creating recipe", err });
  }
};

export const getAllRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipe = await Recipe.find()
      .populate("user", "username")
      .populate("category", "name");
    if (!recipe) return res.status(404).json({ message: "recipe not found" });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ message: "error fetching recipe", err });
  }
};

export const updateRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, instructions, categoryId } = req.body;
  try {
    const updated = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        title,
        instructions,
        category: categoryId,
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "recipe not found" });
    res.status(200).json({ message: "recipe updated", updated });
  } catch (err) {
    res.status(500).json({ message: "error updating recipe ", err });
  }
};

export const deleteRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) return next({ message: "recipe not found", status: 404 });
    next({ message: "recipe deleted", status: 200 });
  } catch (error) {
    next({ message: "error deleting recipe ", status: 500 });
  }
};

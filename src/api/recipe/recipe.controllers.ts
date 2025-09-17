import { NextFunction, Request, Response } from "express";
import Recipe from "../../models/Recipe";
import Category from "../../models/Category";
import Ingredient from "../../models/Ingredient";

export const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    title,
    instructions,
    category: categoryId,
    ingredients,
    description,
    prep,
    serving,
    user,
  } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    const recipe = new Recipe({
      title,
      instructions,
      description,
      prep,
      serving,
      user,
      category: categoryId,
      ingredients,
    });
    await recipe.save();
    category.recipe.push(recipe._id);
    await category.save();
    if (ingredients && ingredients.length > 0) {
      await Ingredient.updateMany(
        { _id: { $in: ingredients } },
        { $push: { recipe: recipe._id } }
      );
    }

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
      .populate("user", "username email")
      .populate("category", "name color icon")
      .populate("ingredient.ingredient", "names ");
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
    await Category.findByIdAndUpdate(deleted.category, {
      $pull: { recipe: deleted._id },
    });
    res.status(200).json({ message: "recipe deleted" });
  } catch (error) {
    next({ message: "error deleting recipe ", status: 500 });
  }
};

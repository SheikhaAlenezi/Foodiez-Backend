import { Request, Response } from "express";
import Ingredient from "../../models/Ingredient";

export const createIngredient = async (req: Request, res: Response) => {
  try {
    const { names } = req.body;
    if (!names) return res.status(400).json({ message: "names is required" });

    const existing = await Ingredient.findOne({
      names: names.trim().toLowerCase(),
    });
    if (existing)
      return res.status(400).json({ message: "Ingredient already exists" });
    const ingredient = new Ingredient({ names: names.trim().toLowerCase() });
    await ingredient.save();
    res.status(201).json(ingredient);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients = await Ingredient.find().populate("recipe");
    res.json(ingredients);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getIngredientById = async (req: Request, res: Response) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id).populate(
      "recipe"
    );
    if (!ingredient)
      return res.status(404).json({ message: "Ingredient not found" });
    res.json(ingredient);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateIngredient = async (req: Request, res: Response) => {
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("recipe");

    if (!ingredient)
      return res.status(404).json({ message: "Ingredient not found" });

    res.json(ingredient);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteIngredient = async (req: Request, res: Response) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
    if (!ingredient)
      return res.status(404).json({ message: "Ingredient not found" });

    res.json({ message: "Ingredient deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

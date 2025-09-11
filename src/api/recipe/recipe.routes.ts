import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipe,
  updateRecipe,
} from "./recipe.controllers";

const router = express.Router();

router.post("/createRecipe", createRecipe);
router.get("/getAllRecipe", getAllRecipe);
router.put("/updateRecipe/:id", updateRecipe);
router.delete("/deleteRecipe/:id", deleteRecipe);
export default router;

import express from "express";

import { authenticate } from "../../middlewares/authenticate";
import {
  createIngredient,
  deleteIngredient,
  getIngredientById,
  getIngredients,
  updateIngredient,
} from "./ingredient.controllers";

const router = express.Router();

router.post("/createIngredient", createIngredient);
router.get("/getIngredients", getIngredients);
router.get("/getIngredientById/:id", getIngredientById);
router.put("/updateIngredient/:id", updateIngredient);
router.delete("/deleteIngredient/:id", deleteIngredient);

export default router;

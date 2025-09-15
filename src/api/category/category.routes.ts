import express from "express";
import {
  createList,
  getAllCategory,
  getCategoryRecipes,
} from "./category.controllers";
import { authenticate } from "../../middlewares/authenticate";

const router = express.Router();

router.post("/createList", authenticate, createList);
router.get("/getAllCategory", getAllCategory);
router.get("/:id/recipes", getCategoryRecipes);
export default router;

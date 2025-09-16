import express from "express";
import {
  createList,
  deleteCategory,
  getAllCategory,
  getRecipesByCategory,
} from "./category.controllers";
import { authenticate } from "../../middlewares/authenticate";

const router = express.Router();

router.post("/createList", authenticate, createList);
router.get("/getAllCategory", getAllCategory);
router.delete(":id", deleteCategory);
router.get("/:id/recipes", getRecipesByCategory);
export default router;

import express from "express";
import { createList, getAllCategory } from "./category.controllers";
import { authenticate } from "../../middlewares/authenticate";

const router = express.Router();

router.post("/createList", authenticate, createList);
router.get("/getAllCategory", getAllCategory);

export default router;

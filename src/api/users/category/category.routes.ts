import express from "express";
import { createList, getAllCategory } from "./category.controllers";

const router = express.Router();

router.post("/createList", createList);
router.get("/getAllCategory", getAllCategory);

export default router;

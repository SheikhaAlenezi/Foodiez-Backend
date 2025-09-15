import express from "express";
import { signup, getUsers, signin, getUser } from "./users.controllers";
import { authenticate } from "../../middlewares/authenticate";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", getUsers);
router.get("/myProfile", authenticate, getUser);

export default router;

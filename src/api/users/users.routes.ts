import express from "express";
import { authenticate } from "../../middlewares/authenticate";
import { signup, getUsers, signin, getUser } from "./users.controllers";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", getUsers);
router.get("/myProfile", authenticate, getUser);
export default router;

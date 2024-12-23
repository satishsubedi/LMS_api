import express from "express";
const router = express.Router();
import { activateUser, insertNewUser } from "../controllers/authController.js";

// User Signup
router.post("/register", insertNewUser);
router.post("/activate-user", activateUser);

export default router;

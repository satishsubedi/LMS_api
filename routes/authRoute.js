import express from "express";
const router = express.Router();
import {
  activateUser,
  insertNewUser,
  loginUser,
} from "../controllers/authController.js";
import {
  validateLoginData,
  validateSessionData,
  validateSignUpData,
} from "../middleware/validations/authDataValidation.js";

// User Signup
router.post("/register", validateSignUpData, insertNewUser);
router.post("/activate-user", validateSessionData, activateUser);
router.post("/login", validateLoginData, loginUser);

export default router;

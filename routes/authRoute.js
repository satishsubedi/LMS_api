import express from "express";
const router = express.Router();
import {
  activateUser,
  generate_OTP,
  insertNewUser,
  loginUser,
  logoutUser,
  reset_password,
} from "../controllers/authController.js";
import {
  validateForgetpasswordData,
  validateLoginData,
  validateResetpasswordData,
  validateSessionData,
  validateSignUpData,
} from "../middleware/validations/authDataValidation.js";
import {
  renewaccessJWTMiddleware,
  userAuthMiddleware,
} from "../middleware/authMiddleware.js";

// User Signup
router.post("/register", validateSignUpData, insertNewUser);
router.post("/activate-user", validateSessionData, activateUser);
router.post("/login", validateLoginData, loginUser);
router.get("/renew-jwt", renewaccessJWTMiddleware);
router.get("/logout", userAuthMiddleware, logoutUser);
router.post("/forget-password", validateForgetpasswordData, generate_OTP);
router.post("/reset-password", validateResetpasswordData, reset_password);

export default router;

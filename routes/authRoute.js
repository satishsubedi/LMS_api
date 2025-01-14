import express from "express";
const router = express.Router();
import {
  activateUser,
  insertNewUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import {
  validateLoginData,
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

export default router;

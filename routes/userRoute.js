import express from "express";
import { responseClient } from "../middleware/responseClient.js";
import { verifyAcceessJWT } from "../utils/jwt.js";
import { getSession } from "../models/session/sessionModel.js";
import { getUserByEmail } from "../models/user/userModel.js";
import { userAuthMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/profile", userAuthMiddleware, async (req, res) => {
  const user = req.userInfo;
  user.password = undefined;
  user.__v = undefined;
  user.refreshJWT = undefined;
  return responseClient({
    req,
    res,
    message: "User Profile",
    payload: user,
  });
});

export default router;

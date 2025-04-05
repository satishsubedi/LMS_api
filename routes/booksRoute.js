import express from "express";
import {
  deleteBookController,
  getAllAdminBooksController,
  getAllPublicBooksController,
  getSinglePublicBooksController,
  insertNewBook,
  updateBookController,
} from "../controllers/bookController.js";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middleware/authMiddleware.js";

import {
  validateEditBookData,
  validateNewBookData,
} from "../middleware/validations/bookDataValidation.js";
import { upload } from "../utils/multer.js";
const router = express.Router();

// end multer
router.get(
  "/admin",
  userAuthMiddleware,
  adminAuthMiddleware,
  getAllAdminBooksController
);
router.get("/public/:slug", getSinglePublicBooksController);
router.get("/", getAllPublicBooksController);

router.post(
  "/",
  userAuthMiddleware,
  adminAuthMiddleware,
  upload.single("image"),
  // upload.array("image", 2),
  validateNewBookData,
  insertNewBook
);

router.put(
  "/",
  userAuthMiddleware,
  adminAuthMiddleware,
  // upload.single("image"),
  upload.array("images", 2),
  validateEditBookData,
  updateBookController
);

router.delete(
  "/:_id",
  userAuthMiddleware,
  adminAuthMiddleware,
  deleteBookController
);

export default router;

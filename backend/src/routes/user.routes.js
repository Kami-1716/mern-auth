import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

// register a new user
router.route("/register").post(upload.single("profilePic"), registerUser);
router.route("/login").post(loginUser);

// secure route
router.route("/logout").post(verifyJwt, logoutUser);

export default router;

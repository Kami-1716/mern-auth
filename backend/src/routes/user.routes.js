import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = Router();

// register a new user

router.route("/register").post(upload.single("profilePic"), registerUser);
router.route("/login").post(loginUser);

export default router;

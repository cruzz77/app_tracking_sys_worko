import express from "express";
import {
  registerUser,
  loginUser,
  getProfile
} from "../controllers/auth_controller.js";

import authUser from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authUser, getProfile);

export default router;

import express from "express";
import {
  registerUser,
  loginUser,
  getProfile
} from "../controllers/auth_controller.js";

import authUser from "../middlewares/auth_middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);

authRoutes.get("/profile", authUser, getProfile);

export default authRoutes;

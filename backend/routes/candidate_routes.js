import express from "express";

import {
  createCandidate,
  getCandidates,
  getCandidateById,
  updateStatus,
  deleteCandidate,
  getStats
} from "../controllers/candidate_controller.js";

import authUser from "../middlewares/auth_middleware.js";
import upload from "../middlewares/upload_middleware.js";

const router = express.Router();

router.post("/",authUser,upload.single("resume"),createCandidate);

router.get("/", authUser, getCandidates);
router.get("/stats", authUser, getStats);
router.get("/:id", authUser, getCandidateById);
router.put("/:id/status", authUser, updateStatus);
router.delete("/:id", authUser, deleteCandidate);

export default router;

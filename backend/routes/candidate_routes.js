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

const candidateRoutes = express.Router();

candidateRoutes.post("/",authUser,upload.single("resume"),createCandidate);

candidateRoutes.get("/", authUser, getCandidates);
candidateRoutes.get("/stats", authUser, getStats);
candidateRoutes.get("/:id", authUser, getCandidateById);
candidateRoutes.put("/:id/status", authUser, updateStatus);
candidateRoutes.delete("/:id", authUser, deleteCandidate);

export default candidateRoutes;

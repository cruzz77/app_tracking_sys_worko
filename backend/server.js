import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./configs/mongodb.js";

import authRoutes from "./routes/auth_routes.js";
import candidateRoutes from "./routes/candidate_routes.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({success: false,message: err.message || "Server Error"});
});

const PORT = process.env.PORT || 5090;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});

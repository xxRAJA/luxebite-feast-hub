import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./api/auth.ts";
import menuRoutes from "./api/menu.ts";
import orderRoutes from "./api/order.ts";
import userRoutes from "./api/user.ts";


dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;  // Fix: string → number

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/user", userRoutes);

app.get("/", (_req, res) => {
  res.send("LuxeBite Backend Running 🚀");
});

// ✅ New mongoose connection (no deprecated options)
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/luxebite")
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

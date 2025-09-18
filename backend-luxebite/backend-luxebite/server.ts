import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan"; // Added for request logging
import authRoutes from "../api/auth.js";
import menuRoutes from "../api/menu.js";
import orderRoutes from "../api/order.js";
import userRoutes from "../api/user.js";

// Load environment variables
dotenv.config();

// Validate environment variables
const PORT = parseInt(process.env.PORT || "5000", 10);
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/luxebite";

if (isNaN(PORT) || PORT < 1 || PORT > 65535) {
  console.error("❌ Invalid PORT value. Using default port 5000.");
}

// Initialize Express app
const app = express();

// Middleware
app.use(morgan("dev")); // Request logging
app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? ["https://your-frontend-domain.com"] // Restrict origins in production
      : "*", // Allow all in development
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "1mb" })); // Set payload size limit

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/user", userRoutes);

// Root route
app.get("/", (_req, res) => {
  res.send("LuxeBite Backend Running 🚀");
});

// Global error-handling middleware
app.use((err, _req, res, _next) => {
  console.error("❌ Server Error:", err
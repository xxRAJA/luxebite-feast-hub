import { Router } from "express";
const router = Router();

// Signup
router.post("/signup", (req, res) => {
  // TODO: Implement signup logic
  res.send("Signup endpoint");
});

// Login
router.post("/login", (req, res) => {
  // TODO: Implement login logic
  res.send("Login endpoint");
});

export default router;

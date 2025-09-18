import { Router } from "express";
const router = Router();

// Get user profile
router.get("/:userId", (req, res) => {
  // TODO: Implement user profile fetch logic
  res.send({ userId: req.params.userId, name: "Aryan Thakur" });
});

export default router;

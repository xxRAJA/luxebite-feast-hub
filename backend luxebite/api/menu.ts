import { Router } from "express";
const router = Router();

// Get menu
router.get("/", (req, res) => {
  // TODO: Implement menu fetch logic
  res.send(["Paneer Tikka", "Sushi Platter", "Vegan Burger"]);
});

export default router;

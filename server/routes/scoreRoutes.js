import express from "express";
import Scores from "../models/score-model.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, score } = req.body;
  if (!username || score == null) return res.status(400).json({ message: "Missing fields" });
  const entry = await Scores.create({ username, score, at: new Date().toISOString() });
  res.status(201).json(entry);
});

router.get("/highest", async (req, res) => {
  const top = await Scores.findHighest();
  if (!top) return res.json({ message: "No scores yet" });
  res.json(top);
});

export default router;

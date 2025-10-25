import express from "express";
import Questions from "../models/question-model.js";
const router = express.Router();

router.get("/", async (req, res) => {
    const data = await Questions.findAll();
    res.json(data);
  });

export default router;

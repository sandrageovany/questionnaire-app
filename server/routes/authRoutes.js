// server/routes/authRoutes.js

import express from "express";
import userModel from "../models/user-model.js"; // import your model
const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = await userModel.create({ username, email, password });
  console.log("Current users:", await userModel.findAll());

  res.status(201).json({ message: "Signup successful", user: newUser });
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user: { username: user.username, email: user.email },
  });
});
export default router;

import express from "express";
import { basicAuth } from "../middlewares/auth.js";
import bcrypt from "bcrypt";

import User from "../models/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
	const { username, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = new User({ username, password: hashedPassword });
	await user.save();
	res.send("User registered successfully");
});

router.get("/", basicAuth, (req, res) => {
	res.send(`Welcome ${JSON.stringify(req.user)}!`);
});

export default router;

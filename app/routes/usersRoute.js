import express from "express";
import { generateAccessToken } from "../authentication/authentication.js";
import User from "../db/userSchema.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/exists/:email", async (req, res) => {
  try {
    const exists = await User.exists({
      email: req.params.email,
    });
    res.send(exists);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      displayName: req.body.displayName,
    });
    const userResult = await user.save();
    const token = generateAccessToken({ username: userResult.email });
    res.json(token);
    //res.send(userResult);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

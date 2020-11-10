import express from "express";
import {
  generateAccessToken,
  generateHash,
  checkPassword,
} from "../authentication/authentication.js";
import User from "../db/userSchema.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const passwordMatches = await checkPassword(
      req.body.password,
      user.passwordHash
    );
    if (!passwordMatches) return res.sendStatus(401);
    const token = generateAccessToken({ username: user.email });
    res.send({
      email: user.email,
      displayName: user.displayName,
      token: token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const hash = await generateHash(req.body.password);
    const user = new User({
      email: req.body.email,
      displayName: req.body.displayName,
      passwordHash: hash,
    });
    const userResult = await user.save();
    const token = generateAccessToken({ username: userResult.email });
    res.send({
      email: user.email,
      displayName: user.displayName,
      token: token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

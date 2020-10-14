import express from "express";
import User from "../db/user.js";

const router = express.Router();

router.get("/:userId", (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) return res.send(err);
    res.send(user);
  });
});

router.post("/", (req, res) => {
  console.log(req.body.name);
  const user = new User({ name: req.body.name });
  console.log("test2");
  user.save((err, user) => {
    console.log("test3");
    if (err) return res.send(err);
    res.send(user);
  });
});

export default router;

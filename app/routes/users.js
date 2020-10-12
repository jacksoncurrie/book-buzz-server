import express from "express";
const router = express.Router();

router.get("/:userId", (req, res) => {
  res.send("user " + req.params.userId);
});

router.post("/", (req, res) => {
  res.send("user " + req.body.name);
});

export default router;

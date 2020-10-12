import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  res.send("bookreview " + req.body.name);
});

router.delete("/:bookReveiwId", (req, res) => {
  res.send("book deleted");
});

export default router;

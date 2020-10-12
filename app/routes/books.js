import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("books");
});

router.get("/:bookId", (req, res) => {
  res.send("book " + req.params.bookId);
});

router.get("/search/:search", (req, res) => {
  res.send("book search " + req.params.search);
});

router.post("/", (req, res) => {
  res.send("book " + req.body.name);
});

export default router;

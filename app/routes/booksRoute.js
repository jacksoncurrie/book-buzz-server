import express from "express";
import { authenticateToken } from "../authentication/authentication.js";
import Book from "../db/bookSchema.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const books = await Book.find()
      .populate({
        path: "reviews",
        populate: {
          path: "revieweeId",
        },
      })
      .exec();
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:bookId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/search/:search", async (req, res) => {
  try {
    const books = await Book.find({
      $or: [
        {
          bookName: {
            $regex: req.params.search,
            $options: "i",
          },
        },
        {
          author: {
            $regex: req.params.search,
            $options: "i",
          },
        },
      ],
    });
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const book = new Book({
      bookName: req.body.bookName,
      author: req.body.author,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      reviews: [],
    });
    const bookResult = await book.save();
    res.send(bookResult);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

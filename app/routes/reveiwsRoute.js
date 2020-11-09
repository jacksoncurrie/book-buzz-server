import express from "express";
import { authenticateToken } from "../authentication/authentication.js";
import Review from "../db/reviewSchema.js";
import Book from "../db/bookSchema.js";

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  try {
    const review = new Review({
      revieweeId: req.body.revieweeId,
      rating: req.body.rating,
      review: req.body.review,
      reviewDate: new Date(),
    });
    const reviewResult = await review.save();
    await Book.updateOne(
      { _id: req.body.bookId },
      { $push: { reviews: review._id } }
    );
    await reviewResult.populate("revieweeId").execPopulate();
    res.send(reviewResult);
  } catch (err) {
    res.status(500).send(bookErr);
  }
});

router.delete("/:bookReviewId", authenticateToken, async (req, res) => {
  try {
    await Book.updateMany({ $pull: { reviews: req.params.bookReviewId } });
    await Review.deleteOne({ _id: req.params.bookReviewId });
    res.send({
      result: "Success",
      message: "Successfully deleted book review",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

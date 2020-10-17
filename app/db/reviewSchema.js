import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  revieweeId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    unique: false,
    required: true,
  },
  rating: {
    type: Number,
    unique: false,
    required: true,
  },
  review: {
    type: String,
    unique: false,
    required: true,
  },
  reviewDate: {
    type: Date,
    unique: false,
    required: true,
  },
});

export default mongoose.model("Review", reviewSchema);

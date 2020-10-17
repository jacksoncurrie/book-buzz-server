import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    unique: false,
    required: true,
  },
  author: {
    type: String,
    unique: false,
    required: true,
  },
  imageUrl: {
    type: String,
    unique: false,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
  ],
});

export default mongoose.model("Book", bookSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  displayName: {
    type: String,
    unique: false,
    required: true,
  },
  passwordHash: {
    type: String,
    unique: false,
    required: true,
  }
});

export default mongoose.model("User", userSchema);

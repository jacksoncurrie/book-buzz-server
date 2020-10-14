import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: false,
  },
});

export default mongoose.model("User", userSchema);

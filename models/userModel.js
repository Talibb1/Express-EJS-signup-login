import mongoose from "mongoose";

// ***********   Create a Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  join: {
    type: Date,
    default: Date.now,
  },
});

// Create a Model (Compiling schema)
const userModel = mongoose.model("user", userSchema);

export default userModel;

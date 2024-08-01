const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["superadmin", "user"], default: "user" },
    token: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;

// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to user
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);

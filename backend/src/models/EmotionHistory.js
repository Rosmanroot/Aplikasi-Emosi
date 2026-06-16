// Emotion history model
const mongoose = require("mongoose");

const emotionHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["text", "face"], required: true },
  emotion: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EmotionHistory", emotionHistorySchema);

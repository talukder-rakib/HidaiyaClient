const mongoose = require("mongoose");

const zakatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  income: Number,
  savings: Number,
  gold: Number,
  silver: Number,
  calculatedAmount: Number
}, { timestamps: true });

module.exports = mongoose.model("Zakat", zakatSchema);

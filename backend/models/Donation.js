const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: Number,
  method: { type: String, enum: ["SSLCommerz"], required: true },
  status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Donation", donationSchema);

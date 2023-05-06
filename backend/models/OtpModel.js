const mongoose = require("mongoose");

const otp = new mongoose.Schema(
  {
    phone: String,
    otp: String,
    expire: Date,
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "OTP",
  }
);

module.exports = mongoose.model("OTP", otp);

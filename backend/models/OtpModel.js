const mongoose = require("mongoose");

const otp = new mongoose.Schema(
  {
    email: String,
    otp: String,
    status: String,
    createdAt: { type: Date, default: Date.now },
    expireAt: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "OTP",
  }
);

module.exports = mongoose.model("OTP", otp);

const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {},
  {
    collection: "Reviewinfo",
  }
);

const Review = mongoose.model("Reviewinfo", ReviewSchema);

module.exports = Review;

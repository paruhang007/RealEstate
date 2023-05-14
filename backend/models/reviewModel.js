const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    userId: String,
    img: String,
    serOname: String,
    serDesc: String,
    serType: String,
    status: {
      type: String,
      default: "unresolved",
    },
  },
  {
    collection: "Reviewinfo",
  }
);

const Review = mongoose.model("Reviewinfo", ReviewSchema);

module.exports = Review;

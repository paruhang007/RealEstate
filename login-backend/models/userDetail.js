const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    package: [{
      id: mongoose.Schema.Types.ObjectId,
      packName: String,
      packPrice: String,
      packValidity: String,
      packDescription: String,
    }],
  },
  {
    collection: "UserInfo",
  }
);

const User = mongoose.model("UserInfo", UserDetailsSchema);

module.exports = User;

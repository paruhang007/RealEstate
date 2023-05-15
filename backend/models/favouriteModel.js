const mongoose = require("mongoose");

const FavouriteSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    userId: String,
    poprId: String,
    propUserId: String,
    img: String,
    propName: String,
    propDist: String,
    propMuni: String,
    propStreet: String,
    propPrice: String,
    selectedPayment: String,
  },
  {
    collection: "UserFav",
  }
);

const Fav = mongoose.model("UserFav", FavouriteSchema);

module.exports = Fav;

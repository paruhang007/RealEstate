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
      propName: String,
      propState: String,
      propDist: String,
      propMuni: String,
      propWard: String,
      propStreet: String,
      propFace: String,
      propRoad: String,
      propArea: String,
      propDesc: String,
      propPrice: String,
      selectedFor: String,
      selectedPropertyType: String,
      selectedPropertyUnit: String,
      selectedPayment: String,
      checkboxValues: [],
      verified: {
        type: Boolean,
        default: false,
      },
    }],

    service: [{
      id: mongoose.Schema.Types.ObjectId,
      serName: String,
      serState: String,
      serDist: String,
      serMuni: String,
      serWard: String,
      serStreet: String,
      serOname: String,
      serPhone: String,
      serEmail: String,
      serProd: String,
      serDesc: String,
      selectedServiceType: String,
      verifiedService: {
        type: Boolean,
        default: false,
      },

    }],
  },
  {
    collection: "UserInfo",
  }
);

const User = mongoose.model("UserInfo", UserDetailsSchema);

module.exports = User;

const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    convId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true },
  {
    collection: "Message",
  }
);

const Mesg = mongoose.model("Message", MessageSchema);

module.exports = Mesg;

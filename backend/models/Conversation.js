const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true },
  {
    collection: "Conversation",
  }
);

const Conv = mongoose.model("Conversation", ConversationSchema);

module.exports = Conv;

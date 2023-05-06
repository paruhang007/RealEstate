const express = require("express");
const Mesg = require("../models/Message");
const router = express.Router();

//add message using conversation id

router.post("/", async (req, res) => {
  const newMessage = new Mesg(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all messages of a conversation based on conversationId

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Mesg.find({
      convId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

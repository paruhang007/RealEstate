const express = require("express");
const Conv = require("../models/Conversation");
const User = require("../models/userDetail");
const router = express.Router();

// new conversation

// router.post("/", async (req, res) => {
//   const newConv = new Conv({
//     members: [req.body.senderId, req.body.receiverId],
//   });

//   try {
//     const savedConv = await newConv.save();
//     res.status(200).json(savedConv);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.post("/:senderId/:receiverId", async (req, res) => {
  const senderId = req.params.senderId;
  const receiverId = req.params.receiverId;

  // Check if conversation already exists
  const existingConv = await Conv.findOne({
    members: { $all: [senderId, receiverId] },
  });

  if (existingConv) {
    console.log("Conversation already exists");
    res.status(200).json(existingConv);
  } else {
    // Create new conversation
    const newConv = new Conv({
      members: [senderId, receiverId],
    });

    try {
      const savedConv = await newConv.save();
      res.status(200).json(savedConv);
      console.log("Conversation Created");
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    //console.log(req.params.userId);
    const conversation = await Conv.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post("/userId", async (req, res) => {
//   const { userId } = req.body;
//   try {
//     const conversation = await Conv.find({
//       members: { $in: userId },
//     });
//     res.status(200).json({ data: conversation });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ error: "User not found" });
    }

    res.send({ status: "ok", data: user });
  } catch (error) {
    res.send({ status: "error vayo" });
  }
});

module.exports = router;

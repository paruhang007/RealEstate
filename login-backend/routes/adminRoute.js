const express = require("express");
const router = express.Router();
const { getAllUsers, } = require("../controllers/adminController.js");


router.post("/getAllUsers", getAllUsers);



module.exports = router;
const express = require("express");
const router = express.Router();
const { login, register, otp, addPack, editPack, getPack, deletePack, addService } = require("../controllers/userController.js");

router.post("/login", login);
router.post("/register", register);
router.post("/otp", otp);
router.post("/addPack", addPack);
router.patch("/editPack", editPack);
router.post("/getPack", getPack);
router.delete("/deletePack", deletePack);
router.post("/addService", addService);

module.exports = router;

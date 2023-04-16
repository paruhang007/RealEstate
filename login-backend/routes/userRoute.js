const express = require("express");
const router = express.Router();
const { login, register, otp, addPack, editPack, getPack, getPackAll, deletePack, addService, editService, getService, getServiceAll, deleteService, } = require("../controllers/userController.js");

router.post("/login", login);
router.post("/register", register);
router.post("/otp", otp);
router.post("/addPack", addPack);
router.patch("/editPack", editPack);
router.post("/getPack", getPack);
router.post("/getPackAll", getPackAll);
router.delete("/deletePack", deletePack);
router.post("/addService", addService);
router.patch("/editService", editService);
router.post("/getService", getService);
router.post("/getServiceAll", getServiceAll);
router.delete("/deleteService", deleteService);

module.exports = router;

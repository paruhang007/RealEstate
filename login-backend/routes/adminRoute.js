const express = require("express");
const router = express.Router();
const { adminlogin, changeAdminPass, getAllUser, deleteUser, getAllProp, getAllService, } = require("../controllers/adminController.js");


router.post("/adminlogin", adminlogin);
router.patch("/changeAdminPass", changeAdminPass);
router.post("/getAllUser", getAllUser);
router.delete("/deleteUser", deleteUser);
router.post("/getAllProp", getAllProp);
router.post("/getAllService", getAllService);



module.exports = router;
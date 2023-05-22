const express = require("express");
const router = express.Router();
const {
  adminlogin,
  changeAdminPass,
  getAllUser,
  deleteUser,
  getAllProp,
  getAllService,
  verifyProp,
  verifyService,
} = require("../controllers/adminController.js");

router.post("/adminlogin", adminlogin);
router.patch("/changeAdminPass", changeAdminPass);
router.post("/getAllUser", getAllUser);
router.delete("/deleteUser", deleteUser);
router.post("/getAllProp", getAllProp);
router.post("/getAllService", getAllService);
router.patch("/verifyProp", verifyProp);
router.patch("/verifyService", verifyService);

module.exports = router;

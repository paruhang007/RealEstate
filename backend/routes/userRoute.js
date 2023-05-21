const express = require("express");
const router = express.Router();
const {
  login,
  register,
  userGet,
  userEdit,
  changeUserPass,
  otp,
  otpVerify,
  addPack,
  editPack,
  getPack,
  getPackAll,
  deletePack,
  addService,
  editService,
  getService,
  getServiceAll,
  deleteService,
  uplod_by_link,
  addReview,
  getAllReview,
  editReview,
  addFavourite,
  getFavourite,
  deleteFav,
} = require("../controllers/userController.js");

router.post("/login", login);
router.post("/register", register);
router.post("/userGet", userGet);
router.patch("/userEdit", userEdit);
router.patch("/changeUserPass", changeUserPass);
router.post("/otp", otp);
router.post("/otpVerify", otpVerify);
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
router.post("/uplod_by_link", uplod_by_link);
router.post("/addReview", addReview);
router.post("/getAllReview", getAllReview);
router.patch("/editReview", editReview);
router.post("/addFavourite", addFavourite);
router.post("/getFavourite/:userId", getFavourite);
router.delete("/deleteFav", deleteFav);

module.exports = router;

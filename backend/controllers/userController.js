const User = require("../models/userDetail.js");
const OTP = require("../models/otpModel.js");
const Review = require("../models/reviewModel.js");
const Fav = require("../models/favouriteModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const imageDownloader = require("image-downloader");
const JWT_SECRET = process.env.JWT_SECRET;

// tried to use this code to upload images from the frontend
const uplod_by_link = async (req, res) => {
  const { link } = req.body;
  console.log("this is link");
  console.log(link);
  console.log({ __dirname });
  const newName = Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uplods/" + newName,
  });
  res.json({ status: "ok", data: newName });
};

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.json({ error: "User not found" });
//     }
//     if (bcrypt.compare(password, user.password)) {
//         const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "2h" });
//         console.log(user);

//         if (res.status(201)) {
//             return res.json({ status: "ok", data: token });
//         } else {
//             return res.json({ error: "error" });
//         }
//     }
//     res.json({ satus: "error", error: "Invalid Password" });
// }

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    User.findOne({ email })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(400).send({ error: "Don't have Password" });

            // create jwt token
            const token = jwt.sign(
              {
                id: user._id,
              },
              JWT_SECRET,
              { expiresIn: "2h" }
            );

            return res.json({
              status: "ok",
              data: token,
              email: user.email,
            });
          })
          .catch((error) => {
            return res.status(400).send({ error: "Password does not Match" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: "Username not Found" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const register = async (req, res) => {
  const { fname, lname, email, phone, password } = req.body;
  const encryptPass = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      phone,
      password: encryptPass,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
};

// fetch user data
const userGet = async (req, res) => {
  const { id } = req.body;
  console.log(id);

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.json({ error: "User not found" });
    }

    res.send({ status: "ok", data: user });
  } catch (error) {
    res.send({ status: "error vayo" });
  }
};

const userEdit = async (req, res) => {
  const { fname, lname, email, phone, id, imageLink } = req.body;

  // console.log(req.body);

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.json({ error: "User not found" });
    }

    user.fname = fname;
    user.lname = lname;
    user.email = email;
    user.phone = phone;
    if (imageLink) {
      user.userImg = imageLink;
    }

    await user.save();
    res.send({ status: "updated" });
  } catch (error) {
    res.send({ status: "error" });
  }
};

// const userEdit = async (req, res) => {

//     try {

//         console.log(id);

//         if (id) {
//             const body = req.body;

//             User.updateOne({ _id: id }, body, function (err, data) {
//                 if (err) throw err;
//                 return res.json({ status: "updated success" });
//             })
//         } else {
//             return res.json({ status: "user not found" });
//         }

//     } catch (error) {
//         res.send({ status: "error" });
//     }
// }

// api for password change
const changeUserPass = async (req, res) => {
  const { id, oldPass, newPass, newPassConf } = req.body;

  try {
    console.log(req.body);
    const user = await User.findById(id);
    if (!user) {
      return res.json({ error: "User not found" });
    }
    if (newPass !== newPassConf) {
      return res.json({ error: "Password not matched" });
    }
    if (bcrypt.compare(oldPass, user.password)) {
      const encryptPass = await bcrypt.hash(newPass, 10);
      user.password = encryptPass;
      await user.save();
      res.send({ status: "ok" });
    } else {
      res.send({ status: "error could not change password" });
    }
  } catch (error) {
    console.log(error);
  }
};

// api for otp
const otp = async (req, res) => {
  const { phone } = req.body;
  console.log(phone);
  const otp = Math.floor(1000 + Math.random() * 9000);
  try {
    // const response = await axios.post("https://sms.aakashsms.com/sms/v3/send", {
    //   auth_token: process.env.SMS,
    //   to: phone,
    //   text: `Your otp code is ${otp}`,
    // });
    // console.log(response.data);
    await OTP.create({
      phone,
      otp,
      expire: Date.now() + 300000,
    });
    res.send({ status: "ok", data: otp });
  } catch (error) {
    console.log(error);
  }
};

// api for otp verify
const otpVerify = async (req, res) => {
  const otp = await OTP.findOne({ number: req.body.phone, status: "pending" });
  console.log(otp);
  if (!otp) return res.status(400).send({ message: "Bad Request" });

  const { expireAt } = otp;
  if (expireAt < Date.now()) {
    otp.status = "expired";
    await otp.save();
    return res.status(400).send({ message: "OTP Expired" });
  }
  console.log(otp.otp, req.body.otp);
  if (otp.otp === req.body.otp) {
    otp.status = "verified";
    await otp.save();
    const user = await User.findOne({ number: req.body.phone });
    if (user) {
      if (user.isCompleted) {
        return res.send({ message: "OTP Verified", profile: true });
      } else {
        return res.send({ message: "OTP Verified", profile: false });
      }
    }
  } else {
    return res.status(400).send({ message: "OTP is incorrect" });
  }
};

// CRUD OPERATIONS for package
// Add package
const addPack = async (req, res) => {
  const {
    imageLink,
    propName,
    propState,
    propDist,
    propMuni,
    propWard,
    propStreet,
    propFace,
    propRoad,
    propArea,
    propDesc,
    propPrice,
    selectedFor,
    selectedPropertyType,
    selectedPropertyUnit,
    selectedPayment,
    checkboxValues,
    id,
  } = req.body;
  console.log(req.body);
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.json({ error: "User not found" });
    }

    user.package.push({
      img: imageLink,
      propName,
      propState,
      propDist,
      propMuni,
      propWard,
      propStreet,
      propFace,
      propRoad,
      propArea,
      propDesc,
      propPrice,
      selectedFor,
      selectedPropertyType,
      selectedPropertyUnit,
      selectedPayment,
      checkboxValues,
    });
    await user.save();
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
};

// Edit package
const editPack = async (req, res) => {
  const {
    imageLink,
    propName,
    propState,
    propDist,
    propMuni,
    propWard,
    propStreet,
    propFace,
    propRoad,
    propArea,
    propDesc,
    propPrice,
    selectedFor,
    selectedPropertyType,
    selectedPropertyUnit,
    selectedPayment,
    checkboxValues,
    id,
    packId,
  } = req.body;

  console.log(req.body);

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    const pack = user.package.id(packId);

    pack.propName = propName;
    pack.propState = propState;
    pack.propDist = propDist;
    pack.propMuni = propMuni;
    pack.propWard = propWard;
    pack.propStreet = propStreet;
    pack.propFace = propFace;
    pack.propRoad = propRoad;
    pack.propArea = propArea;
    pack.propDesc = propDesc;
    pack.propPrice = propPrice;
    pack.selectedFor = selectedFor;
    pack.selectedPropertyType = selectedPropertyType;
    pack.selectedPropertyUnit = selectedPropertyUnit;
    pack.selectedPayment = selectedPayment;
    pack.checkboxValues = checkboxValues;
    pack.img = imageLink;

    await user.save();
    res.send({ status: "updated" });
  } catch (error) {
    console.log(error);
  }
};

// Get single package
const getPack = async (req, res) => {
  const { id, packId } = req.body;
  console.log(req.body);
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    // here creating a pack variable and filtering the service array of package object and comparing with the packId and if it matches then it will return the object

    const pack = user.package.filter((pack) => pack._id == packId);
    res.send({ status: "ok", data: pack });
  } catch (error) {
    console.log(error);
  }
};

// Get all packages
const getPackAll = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.json({ error: "User not found" });
    }

    res.send({ status: "ok", data: user.package });
  } catch (error) {
    console.log(error);
  }
};

// Delete package
const deletePack = async (req, res) => {
  const { id, packId } = req.body;
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    user.package.id(packId).remove();
    await user.save();
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
  }
};

// CRUD OPERATIONS for service
// Add service
const addService = async (req, res) => {
  const {
    imageLink,
    serName,
    serState,
    serDist,
    serMuni,
    serWard,
    serStreet,
    serOname,
    serPhone,
    serEmail,
    serProd,
    serDesc,
    selectedServiceType,
    id,
  } = req.body;
  console.log(req.body);
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    user.service.push({
      img: imageLink,
      serName,
      serState,
      serDist,
      serMuni,
      serWard,
      serStreet,
      serOname,
      serPhone,
      serEmail,
      serProd,
      serDesc,
      selectedServiceType,
    });
    await user.save();
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
};

// Edit service
const editService = async (req, res) => {
  const {
    imageLink,
    serName,
    serState,
    serDist,
    serMuni,
    serWard,
    serStreet,
    serOname,
    serPhone,
    serEmail,
    serProd,
    serDesc,
    selectedServiceType,
    id,
    servId,
  } = req.body;
  try {
    console.log(req.body);
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    const serv = user.service.id(servId);
    serv.serName = serName;
    serv.serState = serState;
    serv.serDist = serDist;
    serv.serMuni = serMuni;
    serv.serWard = serWard;
    serv.serStreet = serStreet;
    serv.serOname = serOname;
    serv.serPhone = serPhone;
    serv.serEmail = serEmail;
    serv.serProd = serProd;
    serv.serDesc = serDesc;
    serv.selectedServiceType = selectedServiceType;
    serv.img = imageLink;
    console.log(serv);
    await user.save();
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
  }
};

// Get single service
const getService = async (req, res) => {
  const { id, servId } = req.body;
  console.log(req.body);
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    // here creating a serv variable and filtering the service array of service object and comparing with the servId and if it matches then it will return the object
    const serv = user.service.filter((serv) => serv._id == servId);
    res.send({ status: "ok", data: serv });
  } catch (error) {
    console.log(error);
  }
};

// Get all services
const getServiceAll = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.json({ error: "User not found" });
    }

    res.send({ status: "ok", data: user.service });
  } catch (error) {
    console.log(error);
  }
};

// Delete service
const deleteService = async (req, res) => {
  const { id, servId } = req.body;
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    user.service.id(servId).remove();
    await user.save();
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
  }
};

// add review
const addReview = async (req, res) => {
  const { imageLink, serOname, serDesc, serType, status, id } = req.body;
  console.log(req.body);
  try {
    await Review.create({
      img: imageLink,
      userId: id,
      serOname,
      serDesc,
      serType,
      status,
    });

    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
};

// Get all reviews
const getAllReview = async (req, res) => {
  try {
    const review = await Review.find();
    console.log(review);
    if (!review) {
      return res.json({ error: "Grievance not found" });
    }

    res.send({ status: "ok", data: review });
  } catch (error) {
    console.log(error);
  }
};

// Edit review
const editReview = async (req, res) => {
  const { id } = req.body;
  try {
    console.log(req.body);
    const review = await Review.findOne({ _id: id });
    if (!review) {
      return res.json({ error: "Grievance not found" });
    }
    review.status = "Resolved"; // update the serType property to "Resolved"
    console.log(review);
    await review.save(); // save the updated review to the database
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
  }
};

// adding to favourite
const addFavourite = async (req, res) => {
  const {
    userId,
    poprId,
    propUserId,
    img,
    propName,
    propDist,
    propMuni,
    propStreet,
    propPrice,
    selectedPayment,
  } = req.body;
  console.log(req.body);
  try {
    const user = await Fav.findOne({ userId: userId });
    const prop = await Fav.findOne({ poprId: poprId });
    if (user && prop) {
      return res.json({ error: "Already added to favourite" });
    } else {
      const newFav = new Fav({
        userId,
        poprId,
        propUserId,
        img,
        propName,
        propDist,
        propMuni,
        propStreet,
        propPrice,
        selectedPayment,
      });
      await newFav.save();
      res.send({ hello: "ok" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
};

const getFavourite = async (req, res) => {
  const { userId } = req.params;
  try {
    const userFav = await Fav.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $project: {
          _id: 1,
          id: 1,
          poprId: 1,
          propUserId: 1,
          img: 1,
          propName: 1,
          propDist: 1,
          propMuni: 1,
          propStreet: 1,
          propPrice: 1,
          selectedPayment: 1,
        },
      },
    ]);
    res.send(userFav);
  } catch (error) {
    console.log(error);
  }
};

// Delete service
const deleteFav = async (req, res) => {
  const { packId } = req.body;
  console.log(packId);
  try {
    const user = await Fav.findById({ _id: packId });
    if (!user) {
      return res.json({ error: "Property not found" });
    }
    user.remove();
    await user.save();
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
  }
};

// Exporting all the functions
module.exports = {
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
};

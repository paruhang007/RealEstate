const User = require("../models/userDetail.js");
const Admin = require("../models/adminModel.js");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// FOR ADMIN PANEL

// admin login
const adminlogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    Admin.findOne({ username })
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
              { expiresIn: "24h" }
            );

            return res.json({
              status: "ok",
              data: token,
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

// change password
const changeAdminPass = async (req, res) => {
  const { id, oldPass, newPass, newPassConf } = req.body;

  try {
    console.log(req.body);
    const user = await Admin.findById(id);
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

// get all users
const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    console.log(user);
    if (!user) {
      return res.json({ error: "Users not found" });
    }

    res.send({ status: "ok", data: user });
  } catch (error) {
    console.log(error);
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    user.remove();
    await user.save();
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
  }
};

// get all properties
const getAllProp = async (req, res) => {
  try {
    const user = await User.aggregate([
      {
        $unwind: "$package",
      },
      {
        $project: {
          _id: 1,
          package: 1,
        },
      },
    ]);

    console.log(user);
    res.send({ status: "ok", data: user });
  } catch (error) {
    console.log(error);
  }
};

// get similar peoperty
// const getSimilarProp = async (req, res) => {
//   try {
//     const user = await User.aggregate([
//       {
//         $unwind: "$package",
//       },
//       {
//         $match: {
//           "package.selectedFor": "Rent",
//         },
//       },
//       {
//         $project: {
//           _id: "$package._id",
//           propName: "$package.propName",
//           propDesc: "$package.propDesc",
//           propPrice: "$package.propPrice",
//           propArea: "$package.propArea",
//           propStreet: "$package.propStreet",
//           propRoad: "$package.propRoad",
//           propDist: "$package.propDist",
//           propMuni: "$package.propMuni",
//           propWard: "$package.propWard",
//           propFace: "$package.propFace",
//           img: "$package.img",
//           selectedFor: "$package.selectedFor",
//           selectedPropertyType: "$package.selectedPropertyType",
//           selectedPropertyUnit: "$package.selectedPropertyUnit",
//           selectedPayment: "$package.selectedPayment",
//           verified: "$package.verified",
//         },
//       },
//     ]);

//     console.log(user);
//     res.send({ status: "ok", data: user });
//   } catch (error) {
//     console.log(error);
//   }
// };

// get all services

const getAllService = async (req, res) => {
  try {
    const user = await User.aggregate([
      {
        $unwind: "$service",
      },
      {
        $project: {
          _id: 1,
          service: 1,
        },
      },
    ]);

    console.log(user);
    res.send({ status: "ok", data: user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  adminlogin,
  changeAdminPass,
  getAllUser,
  deleteUser,
  getAllProp,
  getAllService,
};

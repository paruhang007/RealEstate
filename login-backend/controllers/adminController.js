const User = require("../models/userDetail.js");
const Admin = require("../models/adminModel.js");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// FOR ADMIN PANEL 

// get all users

const getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.json({ error: "Users not found" });
        }
        // res.json(user);
        res.send({ status: "ok", data: user });
        console.log(user);
    } catch (error) {
        res.json({ message: error });
    }
};


// get all packages




// get all services 


module.exports = {
    getAllUsers,
};
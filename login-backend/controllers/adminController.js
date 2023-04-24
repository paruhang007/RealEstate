const User = require("../models/userDetail.js");
const Admin = require("../models/adminModel.js");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// FOR ADMIN PANEL 

// get all users

// Get all packages
const getAllUser = async (req, res) => {

    try {
        const user = await User.find();
        console.log(user);
        if (!user) {
            return res.json({ error: "Users not found" });
        }

        res.send({ status: "ok", data: user });
    }
    catch (error) {
        console.log(error);
    }
}


// get all packages




// get all services 


module.exports = {
    getAllUsers,
};
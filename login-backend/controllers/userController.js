const User = require("../models/userDetail.js");
const OTP = require("../models/otpModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User not found" });
    }
    if (bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET);
        console.log(user);

        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({ satus: "error", error: "Invalid Password" });
}

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
}


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
}

// CRUD OPERATIONS for package
const addPack = async (req, res) => {
    const { packName, packFor, packType, packState, packdistrict, packMuni, packWard, PackStreet, packFace, packRoad, PackArea, packValidity, packPrice, packUnit, packDescription, id } = req.body;
    console.log(req.body);
    try {
        const user = await User.findById({ _id: id });
        if (!user) {
            return res.json({ error: "User not found" });
        }
        user.package.push({
            packName,
            packFor,
            packType,
            packState,
            packdistrict,
            packMuni,
            packWard,
            PackStreet,
            packFace,
            packRoad,
            PackArea,
            packDescription,
            packPrice,
            packUnit,
            packValidity,

        });
        await user.save();
        res.send({ status: "ok" });
    }
    catch (error) {
        console.log(error);
    }
}

const editPack = async (req, res) => {
    const { packName, packPrice, packValidity, packDescription, id, packId } = req.body;
    console.log(req.body);
    try {
        const user = await User.findById({ _id: id });
        if (!user) {
            return res.json({ error: "User not found" });
        }
        const pack = user.package.id(packId);

        pack.packName = packName;
        pack.packPrice = packPrice;
        pack.packValidity = packValidity;
        pack.packDescription = packDescription;

        await user.save();
        res.send({ status: "ok" });
    }
    catch (error) {
        console.log(error);
    }
}

const getPack = async (req, res) => {
    const { id, packId } = req.body;
    console.log(req.body);
    try {
        const user = await User.findById({ _id: id });
        if (!user) {
            return res.json({ error: "User not found" });
        }
        const pack = user.package.filter((pack) => pack._id == packId);
        res.send({ status: "ok", data: pack });
    }
    catch (error) {
        console.log(error);
    }
}

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
    }
    catch (error) {
        console.log(error);
    }
}


// CRUD OPERATIONS for service 
const addService = async (req, res) => {
    const { serviceName, serviceType, serviceState, serviceDis, serviceMuni, serviceWard, serviceSreet, servicePro, serviceDesc } = req.body;
    console.log(req.body);
    try {
        const user = await User.findById({ _id: id });
        if (!user) {
            return res.json({ error: "User not found" });
        }
        user.service.push({

        });
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    login,
    register,
    otp,
    addPack,
    editPack,
    getPack,
    deletePack,
    addService,
};

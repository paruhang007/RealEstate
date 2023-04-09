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
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
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
    const {
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
        id
    } = req.body;
    console.log(req.body);
    try {
        const user = await User.findById({ _id: id });
        if (!user) {
            return res.json({ error: "User not found" });
        }

        user.package.push({
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
    }
    catch (error) {
        console.log(error);
        res.send({ status: "error" });
    }
}

const editPack = async (req, res) => {
    const {
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
        packId
    } = req.body;
    console.log(req.body);
    try {
        const user = await User.findById({ _id: id });
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
        // here creating a pack variable and filtering the service array of package object and comparing with the packId and if it matches then it will return the object

        const pack = user.package.filter((pack) => pack._id == packId);
        res.send({ status: "ok", data: pack });
    }
    catch (error) {
        console.log(error);
    }
}

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
    const {
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
    }
    catch (error) {
        console.log(error);
        res.send({ status: "error" });
    }
}

const editService = async (req, res) => {
    const {
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
    console.log(req.body);
    try {
        const user = await User.findById({ _id: id });
        if (!user) {
            return res.json({ error: "User not found" });
        }
        const pack = user.service.id(servId);

        pack.serName = serName;
        pack.serState = serState;
        pack.serDist = serDist;
        pack.serMuni = serMuni;
        pack.serWard = serWard;
        pack.serStreet = serStreet;
        pack.serOname = serOname;
        pack.serPhone = serPhone;
        pack.serEmail = serEmail;
        pack.serProd = serProd;
        pack.serDesc = serDesc;
        pack.selectedServiceType = selectedServiceType;

        await user.save();
        res.send({ status: "ok" });
    }
    catch (error) {
        console.log(error);
    }
}

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
    }
    catch (error) {
        console.log(error);
    }
}

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
    editService,
    getService,
    deleteService,
    getPackAll,
};

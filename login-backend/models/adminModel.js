const mongoose = require("mongoose");

const AdminDetailsSchema = new mongoose.Schema(
    {
        username: String,
        Password: String,

    },
    {
        collection: "AdminInfo",
    }
);

const Admin = mongoose.model("AdminInfo", AdminDetailsSchema);

module.exports = Admin;
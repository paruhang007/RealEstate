const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
require("dotenv").config();

// connecting to the database
const mongoUrl = process.env.MONGO;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((e) => console.log(e));

app.use(express.json());
app.use(cors());
app.use("/", userRoute);

app.listen(5000, () => {
  console.log("Server is loading");
});







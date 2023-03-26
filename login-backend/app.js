const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const { application } = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hjsd23432fs9)d(1"; 
require("./userDetail");

require('dotenv').config();


// connecting to the database 
const mongoUrl =process.env.MONGO;

mongoose.connect(mongoUrl,{
    useNewUrlParser:true
})
.then(()=>{
    console.log("Connected to database ");
})
.catch(e=>console.log(e))


// local host 
app.listen(5000, ()=> {
    console.log("Server is loading");
});



// creating an api to retrive the  data while registering and sending them to the database 
const User = mongoose.model("UserInfo");

app.post("/register", async(req, res)=>{
    const {fname, lname, email, phone, password} = req.body;
    const encryptPass = await bcrypt.hash(password, 10);
    try{
        const oldUser = await User.findOne({email});

        if(oldUser){
            return res.send({error: "User Exists"});
        }
        await User.create({
            fname,
            lname,
            email, 
            phone,
            password:encryptPass,
        });
        res.send({status:"ok"});
    }catch(error){
        res.send({status: "error"});
    }
});


// creating an api to check the login credentials and generating tokens 
app.post("/login", async(req, res)=>{
    const {email, password } = req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.json({error: "User not found"});
    }
    if (await bcrypt.compare(password, user.password)){
        const token = jwt.sign({email:user.email},JWT_SECRET);
        console.log(user);

        if(res.status(201)){
            return res.json({status: "ok", data:token});
        }else{
            return res.json({error:"error"});
        }
    }
    res.json({satus:"error", error:"Invalid Password"});
});


//  using  the  unique token to get user data .
app.post("/userData", async(req, res)=>{
    const {token }= req.body;
    try{
        const user = jwt.verify(token, JWT_SECRET);
        const usermail = user.email;
        User.findOne({email:usermail})
        .then((data)=>{
            res.send({status:"ok", data:data});
        })
        .catch((error)=>{
            res.send({status:"error", data:error});
        });       
    }catch(error){}
})


// app.post("/post", (req, res) =>{
//     console.log(req.body);
//     const {data} = req.body;

//     try{
//         if(data == "hang"){
//             res.send({status : "ok"});
//         }else{
//             res.send({status : " User not found "});
//         }
//     }catch(error){
//         res.send({status : "something went wrong "});
//     }
// });



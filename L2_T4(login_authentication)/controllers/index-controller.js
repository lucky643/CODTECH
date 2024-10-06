const userModel = require("../models/user-model")
const hisaabModel = require("../models/hisaab-model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.landingPageController =  (req, res)=>{
     res.render("index");
}
module.exports.registerPageController = (req, res)=>{
     res.render("register");
}
module.exports.registerController = async (req, res)=>{
     try{
          let {email, username, name, password} = req.body;
          let user = await userModel.findOne({email});
          if(user){
               res.send("user already exists, please login first.");
               return;
          }
          //Hash the password using bcrypt before saving it to the database.
          let salt = await bcrypt.genSalt(10)
          let hashed = await bcrypt.hash(password, salt);
          user = await userModel.create({
               email,
               username,
               name, 
               password: hashed,
          });

          let token = jwt.sign({
               id: user._id,
               email: user.email,
          },
          process.env.JWT_KEY);

          res.cookie("token", token);
          res.send("user created successfully")
     }
     catch(error){
          res.send(error.message);
     }
}
module.exports.loginController =async (req, res)=>{
     let {email, password} = req.body;
     let user = await userModel.findOne({email}).select("+password");
     if(!user){
          res.send("user not found, please register first.");
          return;
     }
     let result =await bcrypt.compare(password, user.password);
     if(result){
          let token = jwt.sign({
               id: user._id,
               email: user.email,
          },
          process.env.JWT_KEY);
          res.cookie("token", token);
          console.log(user)
          res.redirect("/profile");
     } 
     else{
          res.send("your details are incorrect....");
     }
}
module.exports.logoutController = (req, res)=>{
     res.cookie("token", "");
     res.redirect("/");
}
module.exports.profilePageController = (req, res)=>{
     res.render("profile")
}

module.exports.newHisaabController = (req, res)=>{
     res.render("newHisaab");
}

module.exports.hisaabCreatedController = (req, res)=>{
     
     // res.redirect("/profile")
}
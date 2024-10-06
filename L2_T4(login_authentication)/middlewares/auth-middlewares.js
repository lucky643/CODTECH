const jwt = require("jsonwebtoken");
module.exports.isLoggedIn = (req, res, next) => {
     if (req.cookies.token){
          try{
               let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
               req.user = decoded;
               next();
          }
          catch(err){
               res.redirect("/");
          }
     }
     else{
          return res.redirect("/");
     }
}
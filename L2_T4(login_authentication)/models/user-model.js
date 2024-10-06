const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
     username:{
          type: String,
          required: true,
          minLength: 3,
          maxLength: 20,
          trime : true,
     },
     name:{
          type: String,
          required: true,
          trime : true,
     },
     profilepicture:{
          type: String,
          required: false,
     },
     email:{
          type: String,
          required: true,
          unique: true,
          trime : true,
     },
     password:{
          type: String,
          required: true,
          minLength: 8,
          trime : true,
          select : false,
     },
     hisaab: { 
          type: mongoose.Schema.Types.ObjectId,
          ref: 'hisaab',
     }
});

module.exports = mongoose.model("user", userSchema);
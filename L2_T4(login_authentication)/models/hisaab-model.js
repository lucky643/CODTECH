const mongoose = require('mongoose');

const hisaabSchema = mongoose.Schema({
     title :{
          type:String,
          required:true,
          minLength:5,
          trime:true,
     },
     discription :{
          type:String,
          required:true,
          minLength:10,
          trim:true,
     },
     encrypted:{
          type: Boolean,
          default: false,
     },
     shareable:{
          type: Boolean,
          default: false,
     },
     editpermissions:{
          type: Boolean,
          default: false,
     },
     passcode:{
          type: String,
          default: "",
     },
     user:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
     },
},
{ timestamp: true},
);

module.exports = mongoose.model('hisaab', hisaabSchema);
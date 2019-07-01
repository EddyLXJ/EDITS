const mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  userId: Number,
  username:String,
  password:String,
  fname:String,
  lname:String,
  address:String,
  city:String,
  state:String,
  zip:String,
  email:String
});

var userModel = mongoose.model("UserModel", userSchema);

module.exports = userModel;

// Schema for User
const mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  userId: Number,
  username:{type: String, unique: true},
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

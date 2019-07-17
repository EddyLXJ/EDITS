// authService: // authService: handle register and update the user information
var UserModel = require('../models/mongoUser');
var common = require('../common/common');

let adminUser = {
    fname: "Jenny",
    lname: "asdf",
    address: "address",
    city: "city",
    state: "state",
    zip: "zip",
    email: "email",
    username: "jadmin",
    password: "admin"
}
// let new_adminUser = new UserModel(adminUser);
// new_adminUser.save();
//find user
var find = function(username) {
  return new Promise((resolve, reject) => {
    UserModel.findOne({username: username}, function(err, user){
      if(user){
        resolve(user);
      } else {
        reject({message: common.PASSWORD_INVALID});
      }
    });
  });
}

//register new user
var register = function(fname, lname, address, city, state, zip, email, username, password){
  newUser = {
    fname: fname,
    lname: lname,
    address: address,
    city: city,
    state: state,
    zip: zip,
    email: email,
    username: username,
    password: password
  }

  return new Promise((resolve, reject) => {
    UserModel.updateOne({username:username}, {$setOnInsert: newUser, $set: {}}, {upsert: true}, function(err, result){
      console.log(result);
      if("upserted" in result){
        resolve(newUser.fname);
      } else {
        reject({message: common.INPUT_INVALID});
      }
    });
  });
}

//update user information
var update = function(userId, parameter){
  return new Promise((resolve, reject) => {
    console.log(parameter);
    UserModel.updateOne({userId:userId}, parameter, function(err, user){
      if(err){
        reject({message: common.INPUT_INVALID});
      } else {
        resolve(user);
      }
    });
  });
}

// view user by name
var viewUser = function(parameter) {
  parameter1 = {}
  if("fname" in parameter){
      if( parameter.fname.length != 0){
      parameter1["fname"] = {"$regex": parameter.fname}
      }
  }
  if("lname" in parameter){
      if( parameter.lname.length != 0){
      parameter1["lname"] = {"$regex": parameter.lname}
      }
  }

  return new Promise((resolve, reject) => {
    UserModel.find(parameter1, {_id:1, fname: 1, lname:1}, function(err, user){
      if(err){
        reject(err);
      } else {
        reture_user = []
        for(let u of user){
          tem = {}
          tem["userId"] = u["_id"];
          tem["fname"] = u["fname"];
          tem["lname"] = u["lname"];
          reture_user.push(tem);
        }
        resolve(reture_user);
      }
    });
  });
}

module.exports = {
  register: register,
  update: update,
  viewUser: viewUser,
  find:find
}

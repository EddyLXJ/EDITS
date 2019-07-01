// authService: // authService: handle register and update the user information
var UserModel = require('../models/mongoUser');
var common = require('../common/common');

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
    UserModel.findOne({username:username}, function(err, user){
      if(user){
        reject({message: common.INPUT_INVALID});
      } else {
        UserModel.count({}, function(err, num){
          var nUser = new UserModel(newUser);
          nUser.userId = num + 1;
          nUser.save();
          resolve(nUser.fname);
        });
      }
    });
  });
}

//update user information
var update = function(userId, parameter){
  return new Promise((resolve, reject) => {
    if("username" in parameter){
      var username = parameter["username"];
      UserModel.findOne({username:username}, function(err, user){
        if(user){
          reject({message: common.INPUT_INVALID});
        } else {
          UserModel.updateOne({userId:userId}, parameter, function(err, user){
            if(err){
              reject(err);
            } else {
              resolve(user);
            }
          });
        }
      });
    } else {
      UserModel.updateOne({userId:userId}, parameter, function(err, user){
        if(err){
          reject(err);
        } else {
          resolve(user);
        }
      });
    }
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
    UserModel.find(parameter1, {_id:0, fname: 1, lname:1, userId:1}, function(err, user){
      if(err){
        reject(err);
      } else {
        resolve(user);
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

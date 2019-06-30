// authService: handle register and update the user information
var User = require('../models/users');
let common = require('../common/common');


// find user

var find = function(username){
  return new Promise(function(resolve, reject) {
    User.find(username)
        .then(function(user){
          if (user.length != 0){
            resolve(user);
          } else {
            reject({message: common.PASSWORD_INVALID});
          }
        });
  });
}
// register new user
var register = function(fname, lname, address, city, state, zip, email, username, password) {
  return new Promise(function(resolve, reject) {
    User.find(username)
        .then(function(user){
          if(user.length != 0) {
            reject({message: common.INPUT_INVALID});
          } else {
            User.register(fname, lname, address, city, state, zip, email, username, password)
                .then(function(success){
                  resolve(fname);
                }, function(err){
                  reject({message: common.INPUT_INVALID});
                });
          }
        });
  });
}

// update user information
var update = function(userId, parameter){
  return new Promise(function(resolve, reject) {
    if("username" in parameter){
      username = parameter["username"];
      User.find(username)
          .then(function(user) {
            if(user.length != 0) {
              reject({message: common.INPUT_INVALID});
            } else {
              User.update(parameter, userId)
                  .then(function(success){
                    resolve(success);
                  },function(err){
                    reject(err);
                  });
            }
          });
    } else {
      
      User.update(parameter, userId)
                  .then(function(success){
                    resolve(success);
                  },function(err){
                    reject(err);
                  });
    }
  });
}

// view user by name
var viewUser = function(parameter){
  return new Promise(function(resolve, reject) {
    User.view(parameter)
        .then(function(results){
          resolve(results);
        }, function(err){
          reject(err);
        })
        .catch(function(err){
          console.log(err);
        });
  });
}


module.exports = {
  register: register,
  update: update,
  viewUser: viewUser,
  find:find
}

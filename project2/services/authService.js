// authService: handle register and update the user information
let User = require('../models/users');


// find user

var find = function(username){
  return new Promise(function(resolve, reject) {
    let user = new User();
    user.find(username,function(err,result){
        if(err){
            reject({message: "There seems to be an issue with the username/password combination that you entered"});
        } else {
          if (result) {
            resolve(result);
          } else {
            reject({message: "There seems to be an issue with the username/password combination that you entered"});
          }
        }
      })
  });
}
// register new user
var register = function(fname, lname, address, city, state, zip, email, username, password) {
  return new Promise(function(resolve, reject) {
    let user = new User();
    user.find(username, function(err, result){
      if(err){
        reject({message: "The input you provided is not valid"})
      } else {
        if(result) {
          reject({message: "The input you provided is not valid"});
        } else {
          let user1 = new User();
          user1.register(fname, lname, address, city, state, zip, email, username, password, function(err, result){
            if(err){
              reject(err);
            } else {
              resolve(result);
            }
          });
        }
      }
    });
  });
}

// update user information
var update = function(userId, parameter){
  return new Promise(function(resolve, reject) {
    if("username" in parameter){
      username = parameter["username"];
      let user = new User();
      user.find(username, function(err, result){
        if(err){
          reject({message: "The input you provided is not valid"})
        } else {
          if(result) {
            reject({message: "The input you provided is not valid"});
          } else {
            let user1 = new User();
            user1.update(userId, parameter, function(err, results){
              if(err){
                reject(err);
              } else{
                resolve(results);
              }
            });
          }
        }
      });
    } else {
      let user1 = new User();
      user1.update(userId, parameter, function(err, results){
        if(err){
          reject(err);
        } else{
          resolve(results);
        }
      });
    }
  });
}

// view user by name
var viewUser = function(parameter){
  return new Promise(function(resolve, reject) {
    let user = new User();
    user.view(parameter, function( err, results) {
      if(err){
        reject(err);
      } else {
        resolve(results);
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

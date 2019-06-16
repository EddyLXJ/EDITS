let User = require('../models/users');

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


  if(fname != null){

  }

}

module.exports = {
  register: register,
  update: update
}

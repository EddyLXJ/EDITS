var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var User = require('../models/users');
var users = require('../mockUser/users').items;
var authService = require('../services/authService');
var identityKey = 'skey';
var findUser = function(name, password){
    return users.find(function(item){
        return item.name === name && item.password === password;
    });
};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json("Hello world!");
});

// Register
router.post('/registerUser', jsonParser, function( req, res){

  const fname = req.body.fname; //first_name
  const lname = req.body.lname; //last_name
  const address = req.body.address; //address
  const city = req.body.city; //city
  const state = req.body.state; //state
  const zip = req.body.zip; //zip
  const email = req.body.email; //email
  const username = req.body.username; //username
  const password = req.body.password; //password
  if(password == null || password.length == 0 || username == null || username.length == 0
  || email == null || email.length == 0 || zip == null || zip.length == 0 || state == null || state.length == 0
  || city == null || city.length == 0 || address == null || address.length == 0 || lname == null || lname.length == 0
  || fname == null || fname.length == 0){

    res.json({message: "The input you provided is not valid"});

  } else{

    authService.register(fname, lname, address, city, state, zip, email, username, password)
                .then(function (fname) {
                  res.json({message: fname + " was registered successfully"});
                }, function( error ){
                  res.json(error);
                })
  }
})

//updateInfo
router.post('/updateInfo', jsonParser, function( req, res) {
  var parameter = req.body;
  var sess = req.session;
  var loginUser = sess.loginUser;
  var userId = sess.userId;
  if (loginUser) {
      

  } else {
    res.json({message: "You are not currently logged in"})
  }

})

// Login
router.post('/login',jsonParser, function( req, res){
  const username = req.body.username;
  const password = req.body.password;

  let user = new User();
  user.find(username,function(err,result){
      if(err){
          res.json({message: "There seems to be an issue with the username/password combination that you entered"});
      } else {
        if (result) {
          if (result.password !== password) {
            res.json({message: "There seems to be an issue with the username/password combination that you entered"});
          } else {
            req.session.regenerate(function(err) {
                if(err){
                  return res.json({message: "Login fail!"})
                }
                req.session.loginUser = username;
                req.session.userId = result.user_id;
                req.session.fname = result.fname;
                res.json({message: "Welcome " + result.fname});
              })
          }
        } else {
          res.json({message: "There seems to be an issue with the username/password combination that you entered"});
        }

      }

  });
} );

// Logout
router.post('/logout', jsonParser, function( req, res) {
  var sess = req.session;
  var loginUser = sess.loginUser;
  if (loginUser) {
    req.session.destroy(function(err) {
          if(err){
              res.json({message: 'Logout fail'});
              return;
          }
          res.clearCookie(identityKey);
          res.json({message:"You have been successful logged out"})
      });
  } else {
    res.json({message: "You are not currently logged in"})
  }

});


module.exports = router;

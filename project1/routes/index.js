var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var User = require('../models/users');
var users = require('../mockUser/users').items;
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
                res.json({message: "Welcome " + result.first_name});
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
          res.json({message:"You have been successfully logged out"})
      });
  } else {
    res.json({message: "You are not currently logged in"})
  }

});

// add
router.post('/add', jsonParser, function( req, res) {
    var sess = req.session;
    var loginUser = sess.loginUser;
    var num1 = req.body.num1;
    var num2 = req.body.num2;
    var isNumber1 = isNaN(num1);
    var isNumber2 = isNaN(num2);
    if (loginUser){
      if (isNumber1 || isNumber2){
        res.json({message: "The numbers you entered are not valid"})
      } else {
        res.json({message: "The action was successful", result: parseInt(num1) + parseInt(num2)});
      }
    } else {
      res.json({message: "You are not currently logged in"});
    }
});

// devide
router.post('/divide', jsonParser, function( req, res) {
  var sess = req.session;
  var loginUser = sess.loginUser;
  var num1 = req.body.num1;
  var num2 = req.body.num2;
  var isNumber1 = isNaN(num1);
  var isNumber2 = isNaN(num2);
  if (loginUser){
    if (isNumber1 || isNumber2){
      res.json({message: "The numbers you entered are not valid"})
    } else {
      if (parseInt(num2) == 0){
        res.json({message: "The numbers you entered are not valid"})
      } else {
        res.json({message: "The action was successful", result: parseInt(num1) / parseInt(num2)});
      }
    }
  } else {
    res.json({message: "You are not currently logged in"});
  }
})

// multiply
router.post('/multiply', jsonParser, function( req, res) {
  var sess = req.session;
  var loginUser = sess.loginUser;
  var num1 = req.body.num1;
  var num2 = req.body.num2;
  var isNumber1 = isNaN(num1);
  var isNumber2 = isNaN(num2);
  if (loginUser){
    if (isNumber1 || isNumber2){
      res.json({message: "The numbers you entered are not valid"})
    } else {
      res.json({message: "The action was successful", result: parseInt(num1) * parseInt(num2)});
    }
  } else {
    res.json({message: "You are not currently logged in"});
  }
})


module.exports = router;

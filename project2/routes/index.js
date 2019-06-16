var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var User = require('../models/users');
var users = require('../mockUser/users').items;
var authService = require('../services/authService');
var productService = require('../services/productService');
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
});

//updateInfo
router.post('/updateInfo', jsonParser, function( req, res) {
  var parameter = req.body;
  var sess = req.session;
  var loginUser = sess.loginUser;
  var userId = sess.userId;
  if (loginUser) {
      authService.update(userId, parameter)
                  .then(function (success){
                    if("fname" in parameter){
                      var name = parameter["fname"];
                    } else{
                      var name = sess.fname;
                    }
                    res.json({message: name + " your information was successfully updated"});
                  }, function( error ){
                    res.json(error);
                  });
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
                if(req.body.username == "jadmin"){
                  req.session.role = "admin";
                } else {
                  req.session.role = "normal"
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

// add products
router.post('/addProducts', jsonParser, function( req, res) {
  const asin = req.body.asin;
  const productName = req.body.productName;
  const productDescription = req.body.productDescription;
  const group = req.body.group;
  var sess = req.session;
  var loginUser = sess.loginUser;
  if (loginUser) {
    if(sess.role == "admin"){
      if(asin == null || asin.length == 0 || productName == null || productName.length == 0 || productDescription == null || productDescription.length == 0 || group == null || group.length == 0){
        res.json({message: "The input you provided is not valid"});
      } else {
        productService.findProductByAsin(asin)
                    .then(function(result){
                      res.json({message: "The input you provided is not valid"});
                    }, function(error) {
                      productService.addProduct(asin, productName, productDescription, group)
                                    .then(function(success){
                                      res.json({message: productName + " was successfully added to the system"});
                                    }, function(error) {
                                      res.json({message: "The input you provided is not valid"});
                                    });
                    });
      }
    } else {
      res.json({message: "You must be an admin to perform this action"});
    }
  } else {
    res.json({message: "You are not currently logged in"});
  }
});

// modify product
router.post('/modifyProduct', jsonParser, function( req, res) {
  const asin = req.body.asin;
  const productName = req.body.productName;
  const productDescription = req.body.productDescription;
  const group = req.body.group;
  var sess = req.session;
  var loginUser = sess.loginUser;
  if (loginUser) {
    if(sess.role == "admin"){
      if(asin == null || asin.length == 0 || productName == null || productName.length == 0 || productDescription == null || productDescription.length == 0 || group == null || group.length == 0){
        res.json({message: "The input you provided is not valid"});
      } else {
        productService.updateProduct(asin, productName, productDescription, group)
                      .then(function(success){
                        res.json({message: productName + " was successfully updated"});
                      }, function(error) {
                        res.json({message: "The input you provided is not valid"});
                      })
      }
    } else {
      res.json({message: "You must be an admin to perform this action"});
    }
  } else {
    res.json({message: "You are not currently logged in"});
  }
});

// view users
router.post('/viewUsers', jsonParser, function( req, res) {
  var sess = req.session;
  var loginUser = sess.loginUser;
  if (loginUser) {
    if(sess.role == "admin"){
      authService.viewUser(req.body)
                .then(function(results){
                  if(results.length != 0){
                    res.json({message: "The action was successful", user:[results]});
                  } else{
                    res.json({message: "There are no users that match that criteria"});
                  }
                }, function(error) {
                  res.json({message: "Other errors"});
                })
    } else {
      res.json({message: "You must be an admin to perform this action"});
    }
  } else {
    res.json({message: "You are not currently logged in"});
  }
});

// view product
router.post('/viewProducts', jsonParser, function( req, res) {
  
})
module.exports = router;

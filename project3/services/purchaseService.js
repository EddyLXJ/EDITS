var PurchaseModel = require("../models/mongoPurchase");
var ProductModel = require("../models/mongoProduct");
var UserModel = require("../models/mongoUser");
var common = require("../common/common");

// add purchase
var purchase = function(userId, products){
  parameter = {}
  for(let product of products){
    var asin = product["asin"];
    if(asin in parameter){
      parameter[asin] += 1
    } else {
      parameter[asin] = 1
    }
  }


  array = []
  for(let key in parameter){
    array.push(key);
  }
  console.log(array);
  var ori_len = array.length;
  return new Promise((resolve, reject) => {
    ProductModel.find({asin:{$in:array}}, {asin:1, productName:1}, function(err, products){
      var parameter1 = [];

      for(let product of products){
        var tem = {};
        var asin = product["asin"];
        var productName = product["productName"];
        var quantity = parameter[asin];
        tem["asin"] = asin;
        tem["productName"] = productName;
        tem["quantity"] = quantity;
        parameter1.push(tem);
      }
      var new_len = parameter1.length;
      if(new_len != ori_len){
        reject({message: common.NO_PRODUCTS});
      } else {
        PurchaseModel.findOne({userId:userId}, function(err, user){
          if(err){
            reject(err);
          } else {
            if(user){
              PurchaseModel.updateOne({userId:userId}, {$push:{products:{$each: parameter1}}}, function(err, success){
                if(err){
                  reject(err);
                } else {
                  resolve("success");
                }
              });
            } else {
              var new_purchase = new PurchaseModel({userId:userId, products:parameter1});
              new_purchase.save();
              resolve("success");
            }
          }
        });
      }
    });
  });
}

// get history
var getHistory = function(username){
  return new Promise((resolve, reject) => {
    UserModel.findOne({username: username}, {userId:1}, function(err, user){
      if(err){
        reject(err);
      } else {
        if(user){

          PurchaseModel.findOne({userId:user.userId}, {products:1}, function(err, results){
            fin_result = {}
            for(let result of results.products){
              let productName = result["productName"];
              let quantity = result["quantity"];
              if(productName in fin_result){
                fin_result[productName]["quantity"] += quantity;
              } else {
                fin_result[productName] = {"productName": productName, "quantity": quantity};
              }
            }
            return_result = []
            for(let tem in fin_result){
              return_result.push(fin_result[tem]);
            }
            PurchaseModel.updateOne({userId:user.userId}, {products: return_result}, function(err, success){
              if(err){
                reject(err);
              } else {
                resolve(return_result);
              }
            });
          });
        } else {
          reject({message: common.NO_USER});
        }
      }
    })
  });
}

module.exports = {
  purchase: purchase,
  getHistory: getHistory
}

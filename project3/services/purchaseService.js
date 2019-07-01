var PurchaseModel = require("../models/mongoPurchase");
var ProductModel = require("../models/mongoProduct");
var UserModel = require("../models/mongoUser");
var RecomModel = require("../models/mongoRecommendation");
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

//update recommendation
var updateRecommendation = function(products){
  var frequency_object = {}
  for(let product of products){
    frequency_object[product["asin"]] = 1;
  }
  var frequency_array = [];
  for(let p in frequency_object){
    tem = {asin: p, frequency: frequency_object[p]};
    frequency_array.push(tem);
  }
  for(let product of frequency_array){
    RecomModel.findOne({asin:product["asin"]}, function(err, results){
      if(results){
        RecomModel.updateOne({asin:product["asin"]}, {$push:{recommendation:{$each: frequency_array}}}, function(err){});
      } else {
        var new_item = new RecomModel({asin: product["asin"], recommendation:frequency_array});
        new_item.save();
      }
    });
  }
}

//get recommendation
var getRecommendations = function(asin){
  return new Promise((resolve, reject) => {
    RecomModel.findOne({asin:asin},{recommendation:1}, function(err, results){
      if(results){
        new_parameter = {}
        for(let result of results.recommendation){
          var asin_result = result["asin"];
          if(asin_result == asin){
            continue;
          }
          if(asin_result in new_parameter){
            new_parameter[asin_result]["frequency"] += result["frequency"];
          } else{
            new_parameter[asin_result] = {"asin": asin_result, "frequency": result["frequency"]};
          }
        }

        return_purchase = []
        for(let tem in new_parameter){
          return_purchase.push(new_parameter[tem]);
        }

        var sorted_list = return_purchase.sort(compare("frequency"));
        var resolve_list = [];
        var i = 0;
        for(let item of sorted_list){
          resolve_list.push({"asin":item["asin"]});
          i += 1;
          if(i == 5){
            break;
          }
        }
        RecomModel.updateOne({asin:asin}, {recommendation: return_purchase}, function(err, success){
          if(err){
            reject(err);
          } else {
            if(resolve_list.length == 0){
              reject({message: common.NO_RECOMMENDATIONS});
            } else {
              resolve(resolve_list);
            }
          }
        });

      } else {
        reject({message: common.NO_RECOMMENDATIONS});
      }
    });
  });
}

function compare(property){
         return function(obj1,obj2){
             var value1 = obj1[property];
             var value2 = obj2[property];
             return value2 - value1;
         }
    }

module.exports = {
  purchase: purchase,
  getHistory: getHistory,
  updateRecommendation: updateRecommendation,
  getRecommendations: getRecommendations
}

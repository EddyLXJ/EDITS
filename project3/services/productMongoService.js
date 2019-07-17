// product services: handle all actions related to products by mongoose
var ProductModel = require("../models/mongoProduct");

//find product by asin
var findProductByAsin = function(asin){
  return new Promise((resolve, reject) => {
    ProductModel.findOne({asin:asin}, function(error, product) {
      if(error){
        reject(error);
      } else {
        if(product){
          resolve(product);
        } else {
          reject("Empty set");
        }
      }
    });
  });
}

//add Product
var addProduct = function(asin, productName, productDescription, group){
  return new Promise((resolve, reject) => {
    newProduct = {
      productName: productName,
      productDescription: productDescription,
      group:group
    }
    // $inc:{quantity:1}
    ProductModel.updateOne({asin:asin},{$setOnInsert: {productName: productName,productDescription: productDescription,group:group}, $set:{}}, {upsert: true}, function(error, product){
      console.log(product);
      if("upserted" in product){
        resolve(newProduct);
      } else {
        reject("Empty Set");
      }

    });
  });
}

// update Product
var updateProduct = function(asin, productName, productDescription, group) {
  return new Promise((resolve, reject) => {
    new_product = {
      asin:asin,
      productName:productName,
      productDescription: productDescription,
      group:group
    }
    ProductModel.findOneAndUpdate({asin:asin}, {$set: {productName:productName, productDescription: productDescription,group:group}}, {new: true}, function(err, product) {
      if(err){
        reject(err);
      } else {
        if(!product){
          reject("Empty Set")
        } else {
          resolve(product);
        }
      }
    });
  });
}

// viewProduct
var viewProduct = function(parameter){
  parameter1 = {}
  if("asin" in parameter){
    parameter1["asin"] = parameter.asin;
  }
  if("keyword" in parameter){
    parameter1["$or"] = [
      {"productName": {"$regex":parameter.keyword}},
      {"productDescription": {"$regex":parameter.keyword}}
    ];
  }
  if("group" in parameter){
    parameter1["group"] = parameter.group;
  }

  return new Promise((resolve, reject) => {
    ProductModel.find(parameter1,{_id:0, asin:1, productName:1},{limit: 100}, function(err, product) {
      if(err){
        reject(err);
      } else {
        if(product){
          resolve(product);
        } else {
          reject("Empty Set");
        }
      }
    });
  });
}

module.exports = {
  findProductByAsin: findProductByAsin,
  addProduct: addProduct,
  updateProduct: updateProduct,
  viewProduct: viewProduct,

}

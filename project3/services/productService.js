// product services: handle all actions related to products

var Product = require("../models/products");

//find product by asin
var findProductByAsin = function(asin) {
  return new Promise(function(resolve, reject) {
    Product.findByAsin(asin)
          .then(function(result){
            if (result.length != 0){
              resolve(result[0]);
            } else {
              reject("Empty set");
            }
          });
        });
}

var addProduct = function(asin, productName, productDescription, group) {
  return new Promise(function(resolve, reject) {
      Product.addProduct(asin, productName, productDescription, group)
            .then(function(success){
              resolve(success);
            }, function(err) {
              reject(err);
            });
  });
}

var updateProduct = function(asin, productName, productDescription, group) {
  return new Promise(function(resolve, reject) {
      Product.updateProduct(asin, productName, productDescription, group)
            .then(function(success) {
              resolve(success);
            }, function(err){
              reject(err);
            });
      
  });
}

var viewProduct = function(parameter){
  return new Promise(function(resolve, reject) {
    Product.viewProduct(parameter)
          .then(function(success) {
            resolve(success);
          }, function(err){
            reject(err);
          });
  });
}

module.exports = {
  findProductByAsin: findProductByAsin,
  addProduct: addProduct,
  updateProduct: updateProduct,
  viewProduct: viewProduct
}

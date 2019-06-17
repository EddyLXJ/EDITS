// product services: handle all actions related to products

var Product = require("../models/products");

//find product by asin
var findProductByAsin = function(asin) {
  return new Promise(function(resolve, reject) {
    let product = new Product();

    product.findByAsin(asin, function( err, result) {
      if(err) {
        reject({message: common.INPUT_INVALID});
      } else {
        if (result) {
          resolve(result);
        } else {
          reject("Empty set");
        }
      }
    });
  });
}

var addProduct = function(asin, productName, productDescription, group) {
  return new Promise(function(resolve, reject) {
      let product = new Product();
      product.addProduct(asin, productName, productDescription, group, function( err, result) {
        if(err){
          reject(err);
        } else{
          resolve(result);
        }
      });
  });
}

var updateProduct = function(asin, productName, productDescription, group) {
  return new Promise(function(resolve, reject) {
      let product = new Product();
      product.updateProduct(asin, productName, productDescription, group, function( err, result) {
        if(err){
          reject(err);
        } else{
          resolve(result);
        }
      });
  });
}

var viewProduct = function(parameter){
  return new Promise(function(resolve, reject) {
    let product = new Product();
    product.viewProduct(parameter, function( err, result) {
      if(err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  findProductByAsin: findProductByAsin,
  addProduct: addProduct,
  updateProduct: updateProduct,
  viewProduct: viewProduct
}

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
      asin: asin,
      productName: productName,
      productDescription: productDescription,
      group:[group]
    }
    ProductModel.findOne({asin:asin}, function(error, product){
        if(product){
          reject("Product already exist");
        } else {
          var nProduct = new ProductModel(newProduct);
          nProduct.save();
          resolve(nProduct);
        }
    });
  });
}

// update Product
var updateProduct = function(asin, productName, productDescription, group) {
  return new Promise((resolve, reject) => {
    product = {
      asin:asin,
      productName:productName,
      productDescription: productDescription,
      group:[group]
    }
    ProductModel.findOne({asin:asin}, function(error, product) {
      if(product){
        ProductModel.updateOne({asin:asin},product,function(err, product){
          if(err){
            reject(err);
          } else {
            resolve(product);
          }
        });
      } else {
        reject("Empty set");
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
  if("group" in parameter){
    parameter1["group"] = [parameter.group];
  }
  if("keyword" in parameter){
    parameter1["$or"] = [
      {"productName": {"$regex":parameter.keyword}},
      {"productDescription": {"$regex":parameter.keyword}}
    ];
  }
  return new Promise((resolve, reject) => {
    ProductModel.find(parameter1, {_id:0, asin:1, productName: 1}, function(err, product) {
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

const mongoose = require("mongoose");
var productSchema = mongoose.Schema({
  asin:String,
  productName:String,
  productDescription:String,
  group:[[String]],
});

var productModel = mongoose.model("ProductModel", productSchema);

module.exports = productModel;

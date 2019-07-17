// Schema for Product
const mongoose = require("mongoose");
var productSchema = mongoose.Schema({
  asin:String,
  productName:String,
  productDescription:String,
  group:String,
  //quantity: {type: Number, default:0}
});

var productModel = mongoose.model("ProductModel", productSchema);

module.exports = productModel;

// Schema for Purchase History
const mongoose = require("mongoose");
var purchaseSchema = mongoose.Schema({
  userId:Number,
  products:[{
    asin:String,
    productName:String,
    quantity:Number
  }]
});

var purchaseModel = mongoose.model("PurchaseModel", purchaseSchema);

module.exports = purchaseModel;

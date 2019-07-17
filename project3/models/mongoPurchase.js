// Schema for Purchase History
const mongoose = require("mongoose");
var purchaseSchema = mongoose.Schema({
  userId:String,
  products:{}
});

var purchaseModel = mongoose.model("PurchaseModel", purchaseSchema);

module.exports = purchaseModel;

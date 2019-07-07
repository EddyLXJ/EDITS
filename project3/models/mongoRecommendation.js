//Schema for product recommendation
const mongoose = require("mongoose");
var recomSchema = mongoose.Schema({
  asin:String,
  recommendation:[
    {
      asin: String,
      frequency: Number
    }
  ]
});

var recomModel = mongoose.model("RecomModel", recomSchema);
module.exports = recomModel;

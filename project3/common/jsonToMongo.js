const mongoose = require("mongoose");
const co = require('co');
mongoose.connect("mongodb://localhost/products", { useNewUrlParser: true });

const db = mongoose.connection;
var productSchema = mongoose.Schema({
  asin:String,
  productName:String,
  productDescription:String,
  group:String,
});

var ProductModel = mongoose.model("ProductModel", productSchema);
var fileName = '../../../project3script/projectRecordsJSON.json';

var lineReader = require('line-reader');
var execute = true;
var totalRecords = 0;

var values = ""; //The records read from the file.
var numRecords = 0; //The current number of records read from the file.
var recordBlock = 5000; //The number of records to write at once.

lineReader.eachLine(fileName, function(line, last) {
  execute = false;
  currentLine = line.toString().replace(/'/g, "\"", "g");
  try{
    jsonRecord = JSON.parse(currentLine);
    if(jsonRecord.description == null){
      jsonRecord.description = "";
    }
    productName = `${jsonRecord.title}`;
    group = `${jsonRecord.categories[0]}`;
    productDescription = `${jsonRecord.description}`;
    asin = `${jsonRecord.asin}`;
    newProduct = {
      asin: asin,
      productName: productName,
      productDescription: productDescription,
      group:group
    }
    var nProduct = new ProductModel(newProduct);
    nProduct.save();
    // values += `('${jsonRecord.title}', '${jsonRecord.categories[0]}', '${jsonRecord.description}', '${jsonRecord.asin}')`;
    numRecords++;
    if (numRecords == recordBlock) {
      numRecords = 0;
      execute = true;
    }
  }catch(err) {
    execute = false;//there was a quote in the text and the parse failed ... skip insert
    console.log(err);
  }
  if(execute){
    co(function* () {
      console.log("****************************************************in execute**************************************************************************************");
        //var resp = yield sql.query(query);
        //console.log("resp = " + resp);
        totalRecords += recordBlock;
        console.log(totalRecords + " records inserted.");
    });
  }//if(execute)
});//lineReader.eachLine

const mongoose = require("mongoose");
const config = require("./application");
var fs = require('fs');
var mongoDB = process.env.MONGODB_URI || config.mongoUri;
mongoose.connect(mongoDB,
    { useNewUrlParser: true,
      // sslCA: fs.readFileSync('./rds-combined-ca-bundle.pem'),
      // ssl: true,
      // sslValidate: false
    })
      .then(() => console.log('Connection to DB successful'))
      .catch((err) => console.error(err,'Error'));
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection failed：'));
db.once('open', function() {
    console.log("connected...");
});

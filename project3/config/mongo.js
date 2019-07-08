const mongoose = require("mongoose");
const config = require("./application");
const fs = require('fs');
mongoose.connect(config.mongoUri, { useNewUrlParser: true ,ssl: true,
    sslValidate: false,
    sslCA: fs.readFileSync('./rds-combined-ca-bundle.pem')}).then(()=>{console.log("connected")});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection failed：'));

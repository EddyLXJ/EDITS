const mongoose = require("mongoose");
const config = require("./application");
mongoose.connect(config.mongoUri, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection failed：'));

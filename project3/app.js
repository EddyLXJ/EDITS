var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var session = require('express-session');
var redis = require('redis');
var RedisStore = require('connect-redis')(session);
// var FileStore = require('session-file-store')(session);
var mongo = require("./config/mongo");
var common = require("./common/common.js");
var identityKey = 'skey';
const log4js = require('log4js');
var logger = require('./config/log4js');
var app = express();

app.use(log4js.connectLogger(logger, {level:'auto', format:':method :url  :status  :response-time ms'}));


var redisClient = redis.createClient(common.redisPort, common.redisMysql);
// {auth_pass: 'password'}
app.use(session({
    name: identityKey,
    secret: 'eddyli',
    store: new RedisStore({client: redisClient}),
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 15 * 60 * 1000
    }
}));



app.use('/', indexRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
module.exports = app;

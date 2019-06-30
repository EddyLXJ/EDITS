var mysql = require('mysql');
var Sequelize = require("sequelize");


module.exports = new Sequelize('project2', 'root', '123456999', {
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
        max: 20,
        min: 0,
        idle: 10000
    }
});

// var connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '123456999',
//     port: '3306',
//     database: 'project2',
// });
// // get a connection from the pool
// connection.connect(function(err) {
//     if (err) {
//         console.log('[query] - :' + err);
//         return;
//     }
//     console.log('[connection connect]  succeed!');
// });


// module.exports = connection

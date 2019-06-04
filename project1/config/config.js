var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456999',
    port: '3306',
    database: 'project1',
});

module.exports = connection

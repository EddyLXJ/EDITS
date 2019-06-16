var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'database-3.cybumkdukdgl.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: '123456999',
    port: '3306',
    database: 'project1',
});

module.exports = connection

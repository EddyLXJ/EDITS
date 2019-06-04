var connection = require('../config/config')
var User = function() {};
// get a connection from the pool
connection.connect(function(err) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('[connection connect]  succeed!');
});

User.prototype.find = function(username, callback) {
    var sql = "SELECT * FROM `tb_user` WHERE username = '" + username + "'";
    // make the query
    connection.query(sql, function(err,row, results) {
        if (err) {
            callback(true);
            return;
        }
        callback(false, row[0]);
    });

};

module.exports = User;

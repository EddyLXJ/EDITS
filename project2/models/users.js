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

// find one users
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

// register
User.prototype.register = function(fname, lname, address, city, state, zip, email, username, password, callback){
    var sql = "INSERT INTO `tb_user` ( `username`, `password`,`fname`, `lname`, `address`, `city`, `state`, `zip`, `email`) VALUES ( '" + username + "', '" + password + "', '" + fname +"', '"+ lname +"', '"+ address +"', '"+ city +"', '" + state +"', '" + zip +"', '" + email +"');";
    // make the query
    console.log(sql);
    connection.query(sql, function(err,row, results) {
        if (err) {
            // console.log(err);
            callback(true);
            return;
        }
        callback(false, fname);
    });
}

// update 
User.prototype.update = function(fname, lname, address, city, state, zip, email, username, password, callback){
    var sql = "INSERT INTO `tb_user` ( `username`, `password`,`fname`, `lname`, `address`, `city`, `state`, `zip`, `email`) VALUES ( '" + username + "', '" + password + "', '" + fname +"', '"+ lname +"', '"+ address +"', '"+ city +"', '" + state +"', '" + zip +"', '" + email +"');";
    // make the query
    console.log(sql);
    connection.query(sql, function(err,row, results) {
        if (err) {
            // console.log(err);
            callback(true);
            return;
        }
        callback(false, fname);
    });
}

module.exports = User;

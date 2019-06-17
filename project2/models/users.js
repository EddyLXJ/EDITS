var connection = require('../config/config')
var User = function() {};

// find one users
User.prototype.find = function(username, callback) {
    var sql = "SELECT * FROM `tb_user` WHERE username = '" + username + "'";
    console.log(sql);
	// make the query
    connection.query(sql, function(err,row, results) {
        if (err) {
            callback(true);
            return;
        }
        callback(false, row[0]);
    });
}

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
User.prototype.update = function(userId, parameter, callback){
    var temSql = "";
    for(var key in parameter){
      temSql += "`"+key+"`='"+parameter[key]+ "',";
    }
    var sql = "UPDATE `tb_user` SET"+ temSql.slice(0, -1) +" WHERE `userId`='"+ userId +"';";
    console.log(sql);
    connection.query(sql, function(err,row, results) {
        if (err) {
            callback(true);
            return;
        }
        callback(false, "updata success");
    });
}

// view user by any name
User.prototype.view = function(parameter, callback) {
  var temSql = "";
  for(var key in parameter){
    temSql += "`"+ key +"`like '%" + parameter[key] + "%' and ";
  }

  if(temSql.length != 0){
    temSql = temSql.slice(0, -4);
    var sql = "SELECT `fname`, `lname`, `userId` FROM `tb_user` WHERE " + temSql;
  } else {
    var sql = "SELECT `fname`, `lname`, `userId` FROM `tb_user`";
  }
  console.log(sql);
  connection.query(sql, function(err,row, results) {
      if (err) {
          callback(true);
          return;
      }
      callback(false, row);
  });
}


module.exports = User;

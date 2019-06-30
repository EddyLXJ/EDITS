let Sequelize = require('sequelize');
let sequelize = require('../config/config');

let User = sequelize.define('tb_user', {
    userId: {
        field: 'userId',
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    username: {
        field: 'username',
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    password: {
        field: 'password',
        type: Sequelize.STRING(255),
        allowNull: false
    },
    fname: {
        field: 'fname',
        type: Sequelize.STRING(255),
        allowNull: false
    },
    lname: {
        field: 'lname',
        type: Sequelize.STRING(255),
        allowNull: false
    },
    address: {
        field: 'address',
        type: Sequelize.STRING(255),
        allowNull: false
    },
    city: {
        field: 'city',
        type: Sequelize.STRING(255),
        allowNull: false
    },
    state: {
        field: 'state',
        type: Sequelize.STRING(255),
        allowNull: false
    },
    zip: {
        field: 'zip',
        type: Sequelize.STRING(255),
        allowNull: false
    },
    email: {
        field: 'email',
        type: Sequelize.STRING(255),
        allowNull: false
    }
  }, {
    freezeTableName: true
  });

  let user = User.sync({force: true}).then(() => {
    // Table created
    return  User.create({
        fname: "Jenny",
        lname: "Admin",
        address: "4500",
        city: "P",
        state: "PA",
        zip: "zip",
        password: "admin",
        username: "jadmin",
        email: "aaaa"
      });
});

  var find = function(username) {
      return User.findAll({
          where: {
              username: username
          }
      });
  }

  var register = function(fname, lname, address, city, state, zip, email, username, password) {
    return User.create({
        fname: fname,
        lname: lname,
        address: address,
        city: city,
        state: state,
        zip: zip,
        password: password,
        username: username,
        email: email
      });
  }

  var update = function(parameter, userId) {
    return User.update(
        parameter,
        {
        where: {
            userId: userId
        }
    }
    );
  }

  var view = function(parameter) {
    const Op = Sequelize.Op;
    parameter1 = {}
    if("fname" in parameter){
        if( parameter.fname.length != 0){
        parameter1["fname"] = {[Op.like]: '%' + parameter.fname + '%'}
        }
    }
    if("lname" in parameter){
        if( parameter.lname.length != 0){
        parameter1["lname"] = {[Op.like]: '%' + parameter.lname + '%'}
        }
    }
    if(!("fname" in parameter1) && !("lname" in parameter1)){
        parameter1["fname"] = {[Op.like]: `%`};
    }
    
    return User.findAll({
        where: parameter1,
        attributes: ['fname', 'lname', 'userId']
    });
  }

  module.exports = {
      find:find,
      register:register,
      update:update,
      view:view
  }
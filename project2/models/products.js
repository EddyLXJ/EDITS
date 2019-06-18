let Sequelize = require('sequelize');
let sequelize = require('../config/config');

let Product = sequelize.define('tb_product', {
  asin: {
    field: "asin",
    primaryKey: true,
    type: Sequelize.STRING(255),
    allowNull: false
  },
  productName: {
    field: "productName",
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  productDescription: {
    field: 'productDescription',
    type: Sequelize.STRING(10000),
    allowNull: false
  },
  group: {
    field: 'group',
    type: Sequelize.STRING(255),
    allowNull: false
  }
}, {
  freezeTableName: true
});

let product = Product.sync({force: true});

var findByAsin = function(asin){
  return Product.findAll({
    where: {
      asin: asin
    }
  });
}

var addProduct = function(asin, productName, productDescription, group) {
  return Product.create({
    asin: asin,
    productName: productName,
    productDescription: productDescription,
    group: group
  });
}

var updateProduct = function(asin, productName, productDescription, group) {
  parm = {"productName" :productName, "productDescription": productDescription, "group": group};
  return Product.update(
    parm,
    {
    where:{
      asin: asin
    }
  }
  );
}

var viewProduct = function(parameter) {
  const Op = Sequelize.Op;
  parameter1 = {}

  if("asin" in parameter){
    parameter1["asin"] = parameter.asin;
  }
  if("group" in parameter){
    parameter1["group"] = parameter.group;
  }
  if("keyword" in parameter){
    parameter1[Op.or] = [
      {"productName": {[Op.like]:'%' + parameter.keyword + '%'}},
      {"productDescription": {[Op.like]:'%' + parameter.keyword + '%'}}
    ];
  }

  if(!("asin" in parameter) && !("group" in parameter) && !("keyword" in parameter)){
    parameter1["asin"] = {[Op.like]: `%`};
  }

  return Product.findAll({
    where: parameter1,
    attributes: ['asin', 'productName']
  });
}

module.exports = {
  findByAsin: findByAsin,
  addProduct: addProduct,
  updateProduct: updateProduct,
  viewProduct: viewProduct
}
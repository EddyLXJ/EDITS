CREATE TABLE IF NOT EXISTS `tb_user`(
   `userId` INT UNSIGNED AUTO_INCREMENT,
   `username` VARCHAR(100) NOT NULL,
   `password` VARCHAR(40) NOT NULL,
   `fname` VARCHAR(100) NOT NULL,
   `lname` VARCHAR(100) NOT NULL,
   `address` VARCHAR(100) NOT NULL,
   `city` VARCHAR(100) NOT NULL,
   `state` VARCHAR(100) NOT NULL,
   `zip` VARCHAR(100) NOT NULL,
   `email` VARCHAR(100) NOT NUll,
   PRIMARY KEY ( `userId` )
);

CREATE TABLE IF NOT EXISTS `tb_product`(
  `asin` VARCHAR(100) NOT NULL,
  `productName` VARCHAR(1000) NOT NULL,
  `productDescription` VARCHAR(50000) NOT NULL,
  `group` VARCHAR(100) NOT NULL,
  PRIMARY KEY ( `asin` )
);

SELECT * FROM `tb_product` WHERE asin = "1";
INSERT INTO `tb_product` ( `asin`, `productName`, `productDescription`, `group`) VALUES ("1", "erat", "dolor", "DVD");
UPDATE `tb_product` SET `productName` = "aaaa", `productDescription` = "NNNN", `group` = "Toys" WHERE `asin` = "2";
INSERT INTO `tb_user` ( `username`, `password`,`fname`, `lname`, `address`, `city`, `state`, `zip`, `email`)
VALUES ( "jadmin", "admin", "Haaenbvry", "Smaafbith", "4500 Centre Ave", "Pittburgh", "PA", "15213", "eddy.lxj@gmail.com");
UPDATE `tb_user`
SET `fname`="bbb", `lname`="aaaa"
WHERE `userId`="1";

SELECT * FROM `tb_product` WHERE `productName` like "%a%" or `productDescription` like "%a%";

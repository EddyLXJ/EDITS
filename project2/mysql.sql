CREATE TABLE IF NOT EXISTS `tb_user`(
   `user_id` INT UNSIGNED AUTO_INCREMENT,
   `username` VARCHAR(100) NOT NULL,
   `password` VARCHAR(40) NOT NULL,
   `fname` VARCHAR(100) NOT NULL,
   `lname` VARCHAR(100) NOT NULL,
   `address` VARCHAR(100) NOT NULL,
   `city` VARCHAR(100) NOT NULL,
   `state` VARCHAR(100) NOT NULL,
   `zip` VARCHAR(100) NOT NULL,
   `email` VARCHAR(100) NOT NUll,
   PRIMARY KEY ( `user_id` )
);

INSERT INTO `tb_user` ( `username`, `password`,`fname`, `lname`, `address`, `city`, `state`, `zip`, `email`)
VALUES ( "hsmith", "smith", "Henry", "Smith", "4500 Centre Ave", "Pittburgh", "PA", "15213", "eddy.lxj@gmail.com");
INSERT INTO `tb_user` ( `username`, `password`, `lname`) VALUES ("tbucktoo", "bucktoo", "Tim");

CREATE TABLE IF NOT EXISTS `tb_user`(
   `user_id` INT UNSIGNED AUTO_INCREMENT,
   `username` VARCHAR(100) NOT NULL,
   `password` VARCHAR(40) NOT NULL,
   PRIMARY KEY ( `user_id` )
);

INSERT INTO `tb_user` ( `username`, `password`) VALUES ( "hsmith", "smith");
INSERT INTO `tb_user` ( `username`, `password`) VALUES ("tbucktoo", "bucktoo");

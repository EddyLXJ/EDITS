CREATE TABLE IF NOT EXISTS `tb_user`(
   `user_id` INT UNSIGNED AUTO_INCREMENT,
   `username` VARCHAR(100) NOT NULL,
   `password` VARCHAR(40) NOT NULL,
   `first_name` VARCHAR(100) NOT NULL,
   PRIMARY KEY ( `user_id` )
);

INSERT INTO `tb_user` ( `username`, `password`,`first_name`) VALUES ( "hsmith", "smith", "Henry");
INSERT INTO `tb_user` ( `username`, `password`, `first_name`) VALUES ("tbucktoo", "bucktoo", "Tim");

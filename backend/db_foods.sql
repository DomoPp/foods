 CREATE DATABASE db_foods CHARACTER SET utf8 COLLATE utf8_bin;

 CREATE TABLE tb_foods (
    f_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    f_name VARCHAR(50) NOT NULL,
    f_ingredient TEXT NOT NULL,
    f_formula TEXT NOT NULL,
    f_by TEXT NOT NULL,
    f_img VARCHAR(2500) NOT NULL DEFAULT "/system.jpg"
);

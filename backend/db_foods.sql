 CREATE DATABASE db_foods CHARACTER SET utf8 COLLATE utf8_bin;

 CREATE TABLE tb_foods (
    f_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    f_name VARCHAR(50) NOT NULL,
    f_ingredient TEXT NOT NULL,
    f_formula TEXT NOT NULL,
    f_by TEXT NOT NULL,
    f_img VARCHAR(2500) NOT NULL DEFAULT "/system.jpg"
);

CREATE TABLE tb_comment (
    c_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    c_name VARCHAR(50) NOT NULL,
    c_detail VARCHAR(250) NOT NULL,
    c_date DATETIME DEFAULT NOW(),
    c_food INT NOT NULL,
    FOREIGN KEY (c_food) REFERENCES tb_foods(f_id) on update cascade on delete cascade
);

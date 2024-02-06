CREATE DATABASE loginAuthentication;
USE loginAuthentication;
DROP DATABASE loginAuthentication;
CREATE TABLE User (
	id int auto_increment primary key,
	username varchar(100),
    email varchar(100),
    password varchar(100),
    role bool
);
DROP DATABASE IF EXISTS civilface_DB;

CREATE DATABASE civilface_DB;

USE civilface_DB;

CREATE TABLE personDetails(
person_id INT NOT NULL AUTO_INCREMENT,
image TEXT,
age INT,
gender VARCHAR(20),
ethinicity VARCHAR(100),
glasses BOOLEAN,
date TIMESTAMP,
PRIMARY KEY (person_id));
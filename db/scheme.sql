DROP DATABASE IF EXISTS civilface;

CREATE DATABASE civilface;

USE civilface;

CREATE TABLE imageblob(
sub_id INT PRIMARY KEY NOT NULL,
image LONGBLOB,
detials_id INT NOT NULL);

CREATE TABLE imagetext(
sub_id INT PRIMARY KEY NOT NULL,
image LONGTEXT,
details_id INT NOT NULL);

CREATE TABLE details(
details_id INT PRIMARY KEY NOT NULL,
age INT,
gender VARCHAR(20),
ethinicity VARCHAR(100),
glasses BOOLEAN);





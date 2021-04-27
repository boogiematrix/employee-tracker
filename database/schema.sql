DROP DATABASE IF EXISTS workforce;

CREATE DATABASE workforce;

USE workforce;

CREATE TABLE department (
    id INT auto_increment PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT auto_increment PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

CREATE TABLE employee (
    id INT auto_increment PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
)
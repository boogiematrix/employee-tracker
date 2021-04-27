DROP DATABASE IF EXISTS workforce;

CREATE DATABASE workforce;

USE workforce;

CREATE TABLE department (
    id INT NOT NULL auto_increment PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT NOT NULL auto_increment PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    INDEX depart_ind (department_id),
    CONSTRAINT fkdepart
    FOREIGN KEY (department_id)
        REFERENCES department(id)
        ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT NOT NULL auto_increment PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    INDEX role_ind (role_id),
    INDEX manag_ind (manager_id),
    CONSTRAINT fkrole
    FOREIGN KEY (role_id)
      REFERENCES role(id)
      ON DELETE CASCADE,
    CONSTRAINT fkmanager
    FOREIGN KEY (manager_id)
      REFERENCES employee(id)
      ON DELETE SET NULL
);
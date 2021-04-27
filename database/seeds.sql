USE workforce

INSERT INTO department (name)
VALUES ('R&D'),
('Marketing'),
('Accounting'),
('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('Head Researcher', 200000, 1),
('Lab technician', 120000, 1),
('Head of Marketing', 200000, 2),
('Ad Representative', 100000, 2),
('Lead Accountant', 140000, 3),
('Assistant Accountant', 90000, 3),
('Head of HR', 150000, 4),
('Recruiter', 110000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jim', 'Jam', 1, null),
('Tim', 'Tam', 2, 1),
('Jenny', 'Blake', 3, null),
('Terry', 'Berry', 4, 3),
('Angela', 'Martin', 5, null),
('Kevin', 'Malone', 6, 5),
('Sonja', 'Blade', 7, null),
('Armand', 'Stein', 8, 7);
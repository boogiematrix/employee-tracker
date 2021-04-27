const inquirer = require('inquirer');
const mysql = require('mysql');
const middleMan = require('./database/class')
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'mingmang0',
    database: 'workforce',
});

function init() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do with the workforce database?',
                choices: ['Add_department', 'Add_role', 'Add_employee', 'View_departments', 'View_roles', 'View_employees', 'Update_employee_role']
                /*Update employee managers
                View employees by manager
                Delete departments, roles, and employees
                View the total utilized budget of a department -- ie the combined salaries of all employees in that department */
            }
        ])
        .then((answer) => {
            switch (answer.action) {
                case 'Add_department':
                    addDepartment();
                    break;
                case 'Add_role':
                    addRole();
                    break;
                case 'Add_employee':
                    addEmployee();
                    break;
                case 'View_departments':
                    viewDepartments();
                    break;
                case 'View_roles':
                    viewRoles();
                    break;
                case 'View_employees':
                    viewEmployees();
                    break;
                case 'Update_employee_role':
                    updateEmployeeRole();
                    break;
                default:
                    connection.end()
        }
    })
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: 'What is the name of the new department?'
        }
        ])
        .then((answer) => {
        
            connection.query(''/*middleman insert into departments set ?*/, {
                name: answer.newDepartment
            })
            console.log('New department added')
        })
};

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the new role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the new role?'
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'What is the department id of the new role?'
            }
        ])
        .then((answer) => {

            connection.query(''/*middleman insert into departments set ?*/, {
                title: answer.newDepartment,
                salary: answer.salary,
                department_id: answer.departmentId
            })
            console.log('New role added')
        })
};

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the first name of the new employee?'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name of the new employee?'
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'What is the role id of the new employee?'
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'What is the managers id of the new employee?'
            }
        ])
        .then((answer) => {

            connection.query(''/*middleman insert into departments set ?*/, {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.managerId
            })
            console.log('New employee added')
        })
};

function viewDepartments() {

};

function viewRoles() {

};

function viewEmployees() {

};

function updateEmployeeRole() {

};


connection.connect((err) => {
    if (err) throw err;
    init()
});
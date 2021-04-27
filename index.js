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

};

function addRole() {

};

function addEmployee() {

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
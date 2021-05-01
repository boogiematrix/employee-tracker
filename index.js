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
                choices: ['Add_department', 'Add_role', 'Add_employee', 'View_departments', 'View_roles', 'View_employees', 'Update_employee_role', 'Update_managers', 'View_employees_by_manager', 'Delete_department', 'Delete_role', 'Delete_employee', 'View_dept_salary_budget', 'Quit']
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
                case 'Update_managers':
                    updateManagers();
                    break;
                case 'View_employees_by_manager':
                    viewEmployeeByManagers();
                    break;
                case 'Delete_department':
                    deleteDepartment();
                    break;
                case 'Delete_role':
                    deleteRole();
                    break;
                case 'Delete_employee':
                    deleteEmployee();
                    break;
                case 'View_dept_salary_budget':
                    viewDeptSalaryBudget();
                    break;
                case 'Quit':
                    connection.end();
                    break;
                default:
                    console.log('Invalid Choice');
                    init()
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
        
            connection.query(middleMan.createDepartment(), {
                name: answer.newDepartment
            })
            console.log('New department added');
            init()
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

            connection.query(middleMan.createRole(), {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.departmentId
            })
            console.log('New role added');
            init()
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

            connection.query(middleMan.createEmployee(), {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.managerId
            })
            console.log('New employee added');
            init()
        })
};

function viewDepartments() {
    connection.query(middleMan.readDepartments(), (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

function viewRoles() {
    connection.query(middleMan.readRoles(), (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

function viewEmployees() {
    connection.query(middleMan.readEmployees(), (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

function viewEmployeeByManagers() {
    connection.query(middleMan.readEmployees(), (err, res) => {
        if (err) throw err;
        const managerChoices = res.filter(({ manager_id }) => {
            if (manager_id) {
                return false
            } return true
        }).map(({ id, first_name, last_name }) =>
            ({ value: id, name: `${first_name} ${last_name}` }));
            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'managerSelected',
                    message: 'Choose a manager and we will display their employees',
                    choices: managerChoices
                }
            ])
                .then((answers) => {
                console.log(answers.managerSelected)
                connection.query(middleMan.readEmployeeByManager(), [answers.managerSelected], (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    init();
                })
            })
        })
        };
        
function viewDeptSalaryBudget() {
    connection.query(middleMan.readDepartments(), (err, res) => {
        if (err) throw err;
        const departmentChoices = res.map(({id, name}) => 
            ({ value: id, name: name })
        );
        inquirer.prompt([
               {
                   type: 'list',
                   name: 'departmentSelected',
                   message: 'Choose a department and we will display their budget',
                   choices: departmentChoices
               }
           ])
            .then((answer) => {
                connection.query(middleMan.readDeptSalaryBudget(), [answer.departmentSelected], (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    init();
            })
        }).catch((err) => { console.log(err)})
    })
};

function updateEmployeeRole() {
    connection.query(middleMan.readEmployeesAndRoles(), (err, res) => {
        if (err) throw err;
        console.table(res)
        const employeeChoices = res.map(({ employeeId, first_name, last_name }) =>
            ({ value: employeeId, name: `${first_name} ${last_name}` }));
        const roleChoices = res.map(({ roleId, title }) =>
            ({ value: roleId, name: title }));
        console.log(roleChoices)
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employeeToChange',
                    message: 'Which employee would you like to change?',
                    choices: employeeChoices
                },
                {
                    type: 'list',
                    name: 'newRole',
                    message: 'What new role would you like to give them?',
                    choices: roleChoices
                }
            ]).then((answers) => {
                console.log(answers)
                connection.query(middleMan.updateEmployeeRole(),
                    [answers.newRole, answers.employeeToChange], (err, res) => {
                        if (err) throw err;
                        console.log(res)
                    })
                console.log('Employee role updated');
                init()
            })
    })
};
//TODO
function updateManagers() {
    connection.query(middleMan.readEmployees(), (err, res) => {
        if (err) throw err;
        const managerChoices = res.filter(({ manager_id }) => {
            if (manager_id) {
                return false
            } return true
        }).map(({ id, first_name, last_name }) =>
            ({ value: id, name: `${first_name} ${last_name}` }));
        const employeeChoices = res.map(({ id, first_name, last_name }) =>
            ({ value: id, name: `${first_name} ${last_name}` }));
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employeeToChange',
                    message: 'Which employee would you like to change?',
                    choices: employeeChoices
                },
                {
                    type: 'list',
                    name: 'newManager',
                    message: 'What new manager would you like to give them?',
                    choices: managerChoices
                }
            ]).then((answers) => {
                console.log(answers)
                connection.query(middleMan.updateManagers(),
                    [answers.newManager, answers.employeeToChange], (err, res) => {
                        if (err) throw err;
                        console.log(res)
                    })
                console.log('Employee manager updated');
                init()
            })
    });
}
//TODO
function deleteDepartment() {
    connection.query(middleMan.readDepartments(), (err, res) => {
        if (err) throw err;
        const departmentChoices = res.map(({ id, name }) =>
            ({ value: id, name: name })
        )
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'departmentSelected',
                    message: 'Choose a department to delete',
                    choices: departmentChoices
                }
            ])
            .then((answer) => {
                connection.query(middleMan.destroyDepartment(), [answer.departmentSelected], (err, res) => {
                    if (err) throw err;
                    console.log('Department successfully deleted');
                    init();
            })
        })
    })
};
//TODO
function deleteRole() {
    connection.query(middleMan.readRoles(), (err, res) => {
        if (err) throw err;
        const roleChoices = res.map(({ id, title }) =>
            ({ value: id, name: title })
        )
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'roleSelected',
                    message: 'Choose a role to delete',
                    choices: roleChoices
                }
            ])
            .then((answer) => {
                connection.query(middleMan.destroyRole(), [answer.roleSelected], (err, res) => {
                    if (err) throw err;
                    console.log('Role successfully deleted');
                    init();
                })
            })
    })
};
//TODO
function deleteEmployee() {
    connection.query(middleMan.readEmployees(), (err, res) => {
        if (err) throw err;
        const employeeChoices = res.map(({ id, first_name, last_name }) =>
            ({ value: id, name: `${first_name} ${last_name}` })
        )
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employeeSelected',
                    message: 'Choose an employee to delete',
                    choices: employeeChoices
                }
            ])
            .then((answer) => {
                connection.query(middleMan.destroyEmployee(), [answer.employeeSelected], (err, res) => {
                    if (err) throw err;
                    console.log('Employee successfully deleted');
                    init();
                })
            })
    })
};

connection.connect((err) => {
    if (err) throw err;
    init()
});
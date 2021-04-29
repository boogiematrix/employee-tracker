class Middleman {
    constructor() {
        
    };

    createDepartment() {
        return 'INSERT INTO department SET ?'
    };
    
    createRole() {
        return 'INSERT INTO role SET ?'
    };
    
    createEmployee() {
        return 'INSERT INTO employee SET ?'
    };

    readDepartments() {
        return 'SELECT * FROM department'
    };

    readRoles() {
        return 'SELECT * FROM role'
    };

    readEmployees() {
        return 'SELECT * FROM employee'
    };

    readEmployeeByManager() {
        return 'SELECT * FROM employee WHERE manager_id = ?'
    };

    readDeptSalaryBudget() {
        return 'SELECT SUM(role.salary) FROM department\
        JOIN role\
        ON department.id = role.department_id\
        join employee\
        ON role.id = employee.role_id\
        WHERE department.id = ?;'
    };

    readEmployeesAndRoles() {
        return 'SELECT employee.id AS "employeeId", employee.first_name AS first_name, employee.last_name AS last_name, role.id AS roleId, role.title AS title\
        FROM employee\
         INNER JOIN role\
        ON role.id = employee.role_id'
    };

    updateEmployeeRole() {
        return 'UPDATE employee SET role_id = ? WHERE id = ?'
    };

    updateManagers() {
        return 'UPDATE employee SET manager_id = ? WHERE id = ?'
    };

    destroyDepartment() {
        return 'DELETE FROM department WHERE id = ?'
    };

    destroyRole() {
        return 'DELETE FROM role WHERE id = ?'
    };

    destroyEmployee() {
        return 'DELETE FROM employee WHERE id = ?'
    };
}

module.exports = new Middleman
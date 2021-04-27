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

    updateEmployeeRole() {
        return 'UPDATE employee SET ?'
    }
}

module.exports = new Middleman
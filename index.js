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




connection.connect((err) => {
    if (err) throw err;
    init()
});
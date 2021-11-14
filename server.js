const express = require('express')
const router = express.Router();

const PORT = process.env.PORT || 3001;
const app = express();

const mysql = require('mysql2');

const inquirer = require('inquirer')
const cTable = require('console.table');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: '',
      database: 'tracker'
    },
    console.log('Connected to the tracker database.'),
);

const promptUser = () => {
  inquirer.prompt(
    [
      {
        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a role',
          'Add an employee',
          'Update an employee role',
        ]
      }
    ]
  )
  .then((answers) => {
    const { choices } = answers;
    if (choices === "View all departments") {
      showDepartments();
    }

    if (choices === "View all roles") {
      showRoles();
    }

    if (choices === "View all employees") {
      showEmployees();
    }

    if (choices === "Add a department") {
      addDepartment();
    }

    if (choices === "Add a role") {
      addRole();
    }

    if (choices === "Add an employee") {
      addEmployee();
    }

    if (choices === "Update an employee role") {
      updateEmployee();
    }
  }
  )
}

showDepartments = () => {
  // const sql = `SELECT department.id AS id, department.department_name AS department FROM department`; 
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(rows);
    console.table(rows);
    promptUser();
  });
};

showRoles = () => {
  const sql = `SELECT roles.id, roles.title, department.department_name AS department
               FROM roles
               INNER JOIN department ON roles.department_id = department.id`;
  db.query(sql, (err, rows) => {
    if (err) throw err; 
    console.log(rows)
    console.table(rows); 
    promptUser();
  })
};

showEmployees = () => {
  const sql = `SELECT employees.id, 
                      employees.first_name, 
                      employees.last_name, 
                      roles.title, 
                      department.department_name AS department,
                      roles.salary, 
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager
               FROM employees
                      LEFT JOIN roles ON employees.role_id = roles.id
                      LEFT JOIN department ON roles.department_id = department.id
                      LEFT JOIN employees manager ON employees.manager_id = manager.id`;
  db.query(sql, (err, rows) => {
    if (err) throw err; 
    console.log(rows);
    console.table(rows);
    promptUser();
  });
}

addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'addDepartment',
      message: "What department do you want to add?",
      validate: addDepartment => {
        if (addDepartment) {
            return true;
        } else {
            console.log('Please enter a department');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const sql = `INSERT INTO department (name)
                  VALUES (?)`;
      connection.query(sql, answer.addDepartment, (err, result) => {
        if (err) throw err;
        console.log('Added ' + answer.addDepartment + " to departments!"); 
    });
  });
};

promptUser();

module.exports = router;

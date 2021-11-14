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
          'Add a department',
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
      const sql = `INSERT INTO department (department_name)
                  VALUES (?)`;
      db.query(sql, answer.addDepartment, (err, result) => {
        if (err) throw err;
        console.log('Added ' + answer.addDepartment + " to departments!"); 
        promptUser();
      });
      
    });
};

addRole = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'role',
      message: "What is the name of the role?",
      validate: addRole => {
        if (addRole) {
            return true;
        } else {
            console.log('Please enter name of role');
            return false;
        }
      }
    },
    {
      type: 'input', 
      name: 'salary',
      message: "What is the salary of this role?",
      validate: addSalary => {
        if (isNAN(addSalary)) {
            return true;
        } else {
            console.log('Please enter a salary');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const params = [answer.role, answer.salary];
      const roleSql = `SELECT department_name, id FROM department`; 
      db.query(roleSql, (err, data) => {
        if (err) throw err; 
        const department = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
        {
          type: 'list', 
          name: 'dept',
          message: "What department is this role in?",
          choices: department
        }
        ])
          .then(deptChoice => {
            const dept = deptChoice.dept;
            params.push(department);
            const sql = `INSERT INTO roles (title, salary, department_id)
                        VALUES (?, ?, ?)`;
            db.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log('Added' + answer.role + " to roles!"); 
              promptUser();
       });
     });
   });
 });
};

promptUser();

module.exports = router;

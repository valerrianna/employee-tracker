const express = require('express')

const PORT = process.env.PORT || 3001;
const app = express();

const mysql = require('mysql2');

const inquirer = require('inquirer')

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

// app.get('/api/employees', (req, res) => {
//     const sql = `SELECT * FROM employees`;
  
//     db.query(sql, (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: rows
//       });
//     });
// });

showDepartments = () => {
  const sql = `SELECT department.id AS id, department.department_name AS department FROM department`; 

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

showRoles = () => {
  const sql = `SELECT role.id, role.title, department.name AS department
               FROM role
               INNER JOIN department ON role.department_id = department.id`;
  
  connection.promise().query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows); 
    promptUser();
  })
};

showEmployees = () => {
  const sql = `SELECT employees.id, 
                      employees.first_name, 
                      employees.last_name, 
                      roles.title, 
                      department.name AS department,
                      roles.salary, 
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager
               FROM employee
                      LEFT JOIN role ON employees.role_id = role.id
                      LEFT JOIN department ON roles.department_id = department.id
                      LEFT JOIN employees manager ON employees.manager_id = manager.id`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows);
    promptUser();
  });

// Get a single employee
app.get('/api/employees/:id', (req, res) => {
    const sql = `SELECT * FROM employees WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
});

// Create an employee
app.post('/api/employees', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'manager_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, role_id, manager_id) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id]  ;

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
}

promptUser();

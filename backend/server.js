const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const todoRoutes = express.Router();
const PORT = 4000;
let Todo = require('./todo.model');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Manumr@12345',
  database: 'todo_app'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

todoRoutes.route('/').get( (req,res) => {
    connection.query('SELECT * FROM todos', (err, results) => {
        if(err)
            console.log(err);
        else {
            res.json(results);
        }
    });
});

todoRoutes.route('/:id').get((req,res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM todos WHERE id = ?', [id], (err, results) => {
        res.json(results);
    });
});

todoRoutes.route('/add').post((req, res) => {
  const { todo_description, todo_responsible, todo_priority, todo_completed } = req.body;
  connection.query(
    'INSERT INTO todos (todo_description, todo_responsible, todo_priority, todo_completed) VALUES (?, ?, ?, ?)',
    [todo_description, todo_responsible, todo_priority, todo_completed],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, todo_description, todo_responsible, todo_priority, todo_completed });
    }
  );
});

todoRoutes.route('/update/:id').post((req, res) => {
  const id = req.params.id;
  const { todo_description, todo_responsible, todo_priority, todo_completed } = req.body;
  connection.query(
    'UPDATE todos SET todo_description = ?, todo_responsible = ?, todo_priority = ?, todo_completed = ? WHERE id = ?',
    [todo_description, todo_responsible, todo_priority, todo_completed ? 1 : 0, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Todo updated successfully' });
    }
  );
});

app.use('/todos', todoRoutes);

app.listen( PORT, () => {
    console.log("Server is running on port " + PORT);
});

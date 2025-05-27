import { DatabaseSync } from "node:sqlite";

const database = new DatabaseSync("todo.db", (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

database.exec("PRAGMA foreign_keys = ON");
database.exec("PRAGMA journal_mode = WAL");
database.exec("PRAGMA synchronous = NORMAL");
database.exec("PRAGMA cache_size = 10000");

const createTodosTable = `CREATE TABLE IF NOT EXISTS TODOS (
  id TEXT NOT NULL PRIMARY KEY,
  text TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT 0,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES USERS(id)
)`;

const createUsersTable = `CREATE TABLE IF NOT EXISTS USERS (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)`;

database.exec(createUsersTable, (err) => {
  if (err) {
    console.error("Error creating table " + err.message);
  } else {
    console.log("Table created or already exists.");
  }
});

database.exec(createTodosTable, (err) => {
  if (err) {
    console.error("Error creating table " + err.message);
  } else {
    console.log("Table created or already exists.");
  }
});


const insertUser = database.prepare(
  "INSERT INTO USERS (id, name, email, password) VALUES ($id, $name, $email, $password) RETURNING id, name, email"
);

const getUser = database.prepare(
  `SELECT id, name, email, password FROM USERS WHERE email = $email`
);

const insertTodo = database.prepare(
  "INSERT INTO TODOS (id, text, done, user_id) VALUES ($id, $text, 0, $user_id) RETURNING id, text, done, user_id"
);
const updateTodo = database.prepare(
  "UPDATE TODOS SET text = $text, done = $done WHERE id = $id RETURNING id, text, done"
);
const getTodo = database.prepare(
  `SELECT id, text, done, user_id FROM TODOS WHERE id = $id`
);
const getAllTodos = database.prepare(`SELECT id, text, done, user_id FROM TODOS WHERE user_id = $user_id`);

export { database, insertTodo, updateTodo, getTodo, getAllTodos, insertUser, getUser };
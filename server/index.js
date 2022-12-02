const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());

require("dotenv").config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

const db = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
});
db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("DB connected succesful:" + connection.threadId);
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Server Started on port ${port}...`));

app.use(express.json());

app.post("/users", (req, res) => {
  const user = req.body.name;
  const sqlSearch = "SELECT * FROM usermessages WHERE user = ?";
  const search_query = mysql.format(sqlSearch, [user]);
  db.query(search_query, (err, result) => {
    if (err) throw err;
    else {
      console.log("Data sent succesful!");
      res.send(result);
    }
  });
});

app.post("/send", (req, res) => {
  const user = req.body.user;
  const from = req.body.from;
  const message = req.body.message;
  const sqlInsert = "INSERT INTO usermessages VALUES (null,?,?,?)";
  const insert_query = mysql.format(sqlInsert, [user, message, from]);
  db.query(insert_query, (err, result) => {
    if (err) throw err;
    else {
      console.log("Data insert succesful!");
      res.status(201).send("saved");
    }
  });
});

app.get("/getusers", (req, res) => {
  db.query("SELECT user FROM usermessages", (err, result) => {
    if (err) throw err;
    else {
      console.log("Data sent succesful!");
      res.send(result);
    }
  });
});

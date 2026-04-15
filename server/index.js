const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
// const dotenv = require("dotenv");
const app = express();
const port = 8081;

app.use(cors());

require("dotenv").config();
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

const db = mysql.createConnection({
  host: "localhost",
  user: username,
  password: password,
  database: `${database}`,
});

app.get("/", (req, res) => {
  res.send("From Backend");
});

// http://localhost:8081/countrys
app.get("/countries", (req, res) => {
  const cmd = "select * from country";
  db.query(cmd, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// http://localhost:8081/countrys/:code
app.get("/countries/:code", (req, res) => {
  const code = req.params.code;

  const sql = `SELECT * FROM country WHERE Code = "${code}"`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Country not found" });
    }

    res.json(results);
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

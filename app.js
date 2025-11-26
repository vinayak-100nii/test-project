const express = require("express");
const mysql = require("mysql2");
const app = express();

// Connect without specifying database initially
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "admin",
  password: process.env.DB_PASSWORD
});

// Create the database if it doesn't exist
db.query("CREATE DATABASE IF NOT EXISTS testdb", (err) => {
  if (err) throw err;

  // Switch to the database
  db.changeUser({ database: "testdb" }, (err) => {
    if (err) throw err;
    console.log("Connected to DB: testdb");
  });
});

app.get("/", (req, res) => {
  db.query("SELECT NOW() as time", (err, result) => {
    if (err) throw err;
    res.send(`Connected to DB. Time: ${result[0].time}`);
  });
});

app.listen(3000, () => console.log("App running on port 3000"));

const express = require("express");
const mysql = require("mysql2");
const app = express();
const db = mysql.createConnection({
 host: process.env.DB_HOST,
 user: "admin",
 password: process.env.DB_PASSWORD,
 database: "testdb"
});
app.get("/", (req, res) => {
 db.query("SELECT NOW() as time", (err, result) => {
   if (err) throw err;
   res.send(`Connected to DB. Time: ${result[0].time}`);
 });
});
app.listen(3000, () => console.log("App running on port 3000"));

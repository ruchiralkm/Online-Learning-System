const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "1234", // Replace with your MySQL password
  database: "Elearning",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// API Endpoint to insert a student
app.post("/register", (req, res) => {
  const { first_name, last_name, mobile_number, city, email, password } =
    req.body;

  const sql =
    "INSERT INTO Student (first_name, last_name, mobile_number, city, email, password) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [first_name, last_name, mobile_number, city, email, password],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error storing student information");
      } else {
        res.send("Student registered successfully");
      }
    }
  );
});

// API Endpoint for Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql =
    "SELECT first_name, last_name, mobile_number, city, email, password FROM Student WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error during login");
    } else if (results.length > 0) {
      res.json({ success: true, student: results[0] });
    } else {
      res.status(401).send("Invalid email or password");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

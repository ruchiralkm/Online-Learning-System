const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "1234", // Replace with your MySQL password
  database: "Elearning", // Replace with your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Only .png, .jpg, and .jpeg format allowed!"), false); // Reject file
  }
};

const upload = multer({ storage, fileFilter });

//!====================== STUDENT DETAILS ================//

// Register a student
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

// Login Student
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

// Update student details
app.put("/update", (req, res) => {
  const { first_name, last_name, mobile_number, city, email, password } =
    req.body;

  const sql =
    "UPDATE Student SET first_name = ?, last_name = ?, mobile_number = ?, city = ?, password = ? WHERE email = ?";
  db.query(
    sql,
    [first_name, last_name, mobile_number, city, password, email],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating student information");
      } else {
        res.send("Student information updated successfully");
      }
    }
  );
});

// View student details
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM Student";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving student information");
    } else {
      res.json(results); // Send the student data as a JSON response
    }
  });
});

//! END STUDENT DETAILS //

//!====================== COURSE DETAILS ================//

// Add a course with an image
app.post("/add-course", upload.single("image"), (req, res) => {
  const { title, teacher_name, lessons, price } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Store the image path

  const sql =
    "INSERT INTO Courses (title, image, teacher_name, lessons, price) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [title, imagePath, teacher_name, lessons, price],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error storing course information");
      } else {
        res.send("Course added successfully");
      }
    }
  );
});

// Get all courses
app.get("/courses", (req, res) => {
  const sql = "SELECT * FROM Courses";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving course information");
    } else {
      res.json(results); // Send course data as JSON
    }
  });
});

// Update a course
app.put("/update-course/:id", upload.single("image"), (req, res) => {
  const { id } = req.params; // Get course ID from URL
  const { title, teacher_name, lessons, price } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Store the image path if a new image is uploaded

  const sql =
    "UPDATE Courses SET title = ?, teacher_name = ?, lessons = ?, price = ?, image = ? WHERE id = ?";
  db.query(
    sql,
    [title, teacher_name, lessons, price, imagePath, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating course information");
      } else {
        res.send("Course updated successfully");
      }
    }
  );
});

// Delete a course
app.delete("/delete-course/:id", (req, res) => {
  const { id } = req.params; // Get course ID from URL
  const sql = "DELETE FROM Courses WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting course");
    } else {
      res.send("Course deleted successfully");
    }
  });
});

//! END COURSE DETAILS //

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

<<<<<<< HEAD
// Import Express (ESM)
import express from "express";

// Initialize Express app
const app = express();

// Define port
const PORT = 3000;

// Routes
app.get("/home", (req, res) => {
  res.send("This is home page");
});

app.get("/contactus", (req, res) => {
  res.send("Contact us at contact@contact.com");
});

app.get("/about", (req, res) => {
  res.send("Welcome to the About page!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
=======
import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

/* ===============================
   MIDDLEWARE
   =============================== */
app.use(express.json()); // MUST be before routes

/* ===============================
   HELPER FUNCTIONS
   =============================== */
const readDB = () => {
  const data = fs.readFileSync("db.json", "utf-8");
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
};

/* ===============================
   TEST ROUTE
   =============================== */
app.get("/", (req, res) => {
  res.send("Student Management System API is running");
});

/* ===============================
   GET ALL STUDENTS
   =============================== */
app.get("/students", (req, res) => {
  const db = readDB();
  res.status(200).json(db.students);
});

/* ===============================
   ADD NEW STUDENT
   =============================== */
app.post("/students", (req, res) => {
  const { name, course, year } = req.body;

  if (!name || !course || !year) {
    return res.status(400).json({
      message: "All fields (name, course, year) are required"
    });
  }

  const db = readDB();

  const newStudent = {
    id: Date.now(),
    name,
    course,
    year
  };

  db.students.push(newStudent);
  writeDB(db);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

/* ===============================
   UPDATE STUDENT
   =============================== */
app.put("/students", (req, res) => {
  const { id, name, course, year } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Student ID is required"
    });
  }

  const db = readDB();
  const student = db.students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  if (name) student.name = name;
  if (course) student.course = course;
  if (year) student.year = year;

  writeDB(db);

  res.status(200).json({
    message: "Student updated successfully",
    student
  });
});

/* ===============================
   DELETE STUDENT
   =============================== */
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const db = readDB();
  const index = db.students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const deletedStudent = db.students.splice(index, 1);
  writeDB(db);

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent[0]
  });
});

/* ===============================
   START SERVER
   =============================== */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
>>>>>>> 3567e8e (Student Management System using Node.js and Express)

const express = require("express");
const db = require("./db");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
//root route- confrims the server is running
app.get("/", (req, res) => {
  res.send("BackEnd is running with My SQL");  
});

// GET / students- Returns all students from MySQL 
app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (error, results) => {
        if (error){
            console.error("Error Getting Students:", error);
            return res.status(500).json({error: "Failed to Get Students"});
        }
        res.json(results);
    });
});

// POST / students- Recieves new student data and inserts it into MySQL
app.post("/students", (req, res) => {
    const {first_name, last_name, grade_level} = req.body;
    
    // validation- reject if any field is missing
    if(!first_name || !last_name || !grade_level) {
        return res.status(400).json({error: "First Name, Last Name and Grade Level are Required"});
    }
    const sql = "INSERT INTO students(first_name, last_name, grade_level) VALUES(?, ?, ?)";
    db.query(sql, [first_name, last_name, grade_level], (error, results) => {
        if(error){
            console.error("Error Adding Student:", error);
            return res.status(500).json({error: "Failed to Add Student"});
        }
        res.status(201).json({message: "Student Added Succefully", studentId: results.insertId});
    });
});

// GET /students/:id/assignments
app.get("/students/:id/assignments", (req, res) => {
    const {id} = req.params;
    const sql = "SELECT assignments.assignment_name, assignments.due_date, assignments.max_points, student_assignments.score, student_assignments.score, student_assignments.submitted_date, classes.class_name FROM assignments JOIN classes on assignments.class_id = classes.id LEFT JOIN student_assignments ON student_assignments.assignment_id = assignments.id AND student_assignments.student_id = ? WHERE assignments.class_id IN (SELECT class_id FROM enrollments WHERE student_id = ?)";
    db.query(sql, [id, id], (error, results) => {
        if(error) {
            console.error("Error Getting Assignments:", error);
            return res.status(500).json({error: "Failed to Get Assignments"});
        }
        res.json(results);
    });
});

// GET / classes- Returns all class from MySQL 
app.get("/classes", (req, res) => {
    const sql = "SELECT * FROM classes";
    db.query(sql, (error, results) => {
        if (error){
            console.error("Error Getting Classes:", error);
            return res.status(500).json({error: "Failed to Get Clasess"});
        }
        res.json(results);
    });
});
    // GET / enrollments- Returns all Joined data (studet name + class name) from MySQL 
app.get("/enrollments", (req, res) => {
    const sql = "SELECT students.first_name, students.last_name, classes.class_name FROM enrollments JOIN students ON enrollments.student_id = students.id JOIN classes ON enrollments.class_id = classes.id";
    db.query(sql, (error, results) => {
        if (error){
            console.error("Error Getting Enrollments:", error);
            return res.status(500).json({error: "Failed to Get Enrollments"});
        }
        res.json(results);
    });
});

// GET /students/:id — returns one student by id
app.get('/students/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM students WHERE id = ?';
  db.query(sql, [id], (error, results) => {
    if (error) {
      console.error('Error getting student:', error);
      return res.status(500).json({ error: 'Failed to get student' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(results[0]);
  });
});

// GET / students/:id/grades- Returns  grades for one student from MySQL 
app.get('/students/:id/grades', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT classes.class_name, grades.grade_value FROM grades JOIN classes ON grades.class_id = classes.id WHERE grades.student_id = ?";
    db.query(sql, [id], (error, results) => {
        if (error){
            console.error("Error Getting Grades:", error);
            return res.status(500).json({error: "Failed to Get Grades"});
        }
        res.json(results);
    });
});

// GET / students/:id/attendance - Returns attendance for one student
app.get('/students/:id/attendance', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT classes.class_name, attendance.date, attendance.status FROM attendance JOIN classes ON attendance.class_id = classes.id WHERE attendance.student_id = ? ORDER BY attendance.date DESC";
    db.query(sql, [id], (error, results) => {
        if (error){
            console.error("Error Getting Attendance:", error);
            return res.status(500).json({error: "Failed to Get Attendance"});
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});

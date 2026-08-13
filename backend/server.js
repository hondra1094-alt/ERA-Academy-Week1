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
    db.querey(sql, (error, results) => {
        if (error){
            console.error("Error Getting Students:", error);
            return res.status(500).json({error: "Failed to Get Students"});
        }
        res.json(results);
    });
});
// GET / classes- Returns all class from MySQL 
app.get("/classes", (req, res) => {
    const sql = "SELECT * FROM classes";
    db.querey(sql, (error, results) => {
        if (error){
            console.error("Error Getting Classes:", error);
            return res.status(500).json({error: "Failed to Get Clasess"});
        }
        res.json(results);
    });
//     // GET / enrollments- Returns all Joined data (studet name + class name) from MySQL 
// app.get("/students", (req, res) => {
//     const sql = "SELECT * FROM students";
//     db.querey(sql, (error, results) => {
//         if (error){
//             console.error("Error Getting Students:", error);
//             return res.status(500).json({error: "Failed to Get Students"});
//         }
//         res.json(results);
//     });
// });
// // GET / classes- Returns all class from MySQL 
// app.get("/classes", (req, res) => {
//     const sql = "SELECT * FROM classes";
//     db.querey(sql, (error, results) => {
//         if (error){
//             console.error("Error Getting Classes:", error);
//             return res.status(500).json({error: "Failed to Get Clasess"});
//         }
//         res.json(results);
//     });
//     // GET / students- Returns all students from MySQL 
// app.get("/students", (req, res) => {
//     const sql = "SELECT * FROM students";
//     db.querey(sql, (error, results) => {
//         if (error){
//             console.error("Error Getting Students:", error);
//             return res.status(500).json({error: "Failed to Get Students"});
//         }
//         res.json(results);
//     });
// });
// // GET / classes- Returns all class from MySQL 
// app.get("/classes", (req, res) => {
//     const sql = "SELECT * FROM classes";
//     db.querey(sql, (error, results) => {
//         if (error){
//             console.error("Error Getting Classes:", error);
//             return res.status(500).json({error: "Failed to Get Clasess"});
//         }
//         res.json(results);
//     });
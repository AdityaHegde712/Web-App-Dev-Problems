const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const jsonPath = path.join(publicDir, 'students.json');

app.use(express.json());
app.use(express.static(publicDir));

app.get('/students', (req, res) => {
    let students = [];
    try {
        students = JSON.parse(fs.readFileSync(jsonPath));
    } catch (error) {
        console.error('Error reading student data from JSON file: ' + error);
    }

    // Check if a rollNumber is provided in the request query
    const { rollNumber } = req.query;
    if (rollNumber) {
        // Filter students by rollNumber
        students = students.filter(student => student.rollNumber === rollNumber);
    }

    res.json(students);
});

// app.post('/students', (req, res) => {
//     const students = req.body;
//     fs.writeFileSync(jsonPath, JSON.stringify(students, null, 2));
//     res.sendStatus(200);
// });

app.post('/students', (req, res) => {
    const newStudent = req.body;
    const students = JSON.parse(fs.readFileSync(jsonPath));

    // Append the new student to the existing data
    students.push(newStudent);

    fs.writeFileSync(jsonPath, JSON.stringify(students, null, 2));
    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

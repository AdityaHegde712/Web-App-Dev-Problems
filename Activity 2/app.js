const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 8000; // You can change the port if needed

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Check if the database file exists, if not, create it
const databaseFilePath = 'database.json';
if (!fs.existsSync(databaseFilePath)) {
  fs.writeFileSync(databaseFilePath, '{}', 'utf-8');
}

// Serve your registration page
app.use(express.static('public')); // Assuming your HTML file is in a 'public' folder

// Handle form submissions
app.post('/register', (req, res) => {
  const registrationData = req.body;
  
  // Load existing data from the database file
  const existingData = JSON.parse(fs.readFileSync(databaseFilePath, 'utf-8'));

  
  
  // Add new registration data to the array
  // existingData.push(registrationData);
  
  // Write updated data back to the database file
  // fs.writeFileSync(databaseFilePath, JSON.stringify(existingData, null, 2), 'utf-8');
  
  // Respond with a success message or handle errors as needed
  res.send('Registration successful!');
  console.log("Registration Successful!!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

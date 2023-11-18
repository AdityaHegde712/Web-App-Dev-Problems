const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Route for handling POST requests to '/send'
app.post('/send', (req, res) => {
  // Check if the request body contains a 'data' key with value '1'
  if (req.body && req.body.data === "1") {
    // If valid, send a success response
    res.json({ message: 'Success! Received data with value 1.' });
  } else if (req.body && req.body.data === "2") {
    res.status(500).json({ error: "Failure Success! Received data with value 2." });
  } else {
    // If not valid, send an error response
    res.status(400).json({ error: 'Invalid data. Body should contain a JSON object with key "data" and value 1.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

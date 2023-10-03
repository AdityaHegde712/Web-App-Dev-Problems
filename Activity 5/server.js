const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB setup (replace 'your_database_url' with your actual MongoDB URL)
mongoose.connect('mongodb+srv://adityahegde712:AdityaHegde712@registrationdetails.ycf3rdo.mongodb.net/bloop?retryWrites=true&w=majority&appName=AtlasApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const User = mongoose.model('User', {
    username: String,
    email: String,
    password: String,
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// API endpoint to handle registration
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Create a new user
        const user = new User({ username, email, password });
        
        // Save the user to the database
        await user.save();
        
        res.status(201).json({ message: 'Registration successful' });
        console.log('Registration successful')
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

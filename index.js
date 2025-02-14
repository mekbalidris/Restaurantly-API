const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UsersModel = require('./models/users');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://mekbalidriss:idris2005@backenddb.7c6z7.mongodb.net/Restaurantly-RestAPI')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Register Route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with the hashed password
        const user = await UsersModel.insertOne({
            name,
            email,
            password: hashedPassword,
        });

        await user.save()
        console.log("User created:", user); // Log the created user

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
        res.json({ access_token: token, user });
    } catch (err) {
        console.error("Error creating user:", err); // Log any errors
        res.status(500).json({ errors: { server: 'Internal server error' } });
    }
});

app.get('/api/get', async(req, res) =>{
    const users = await UsersModel.find()

    res.status(200).json(users)
})

// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await UsersModel.findOne({ email });
        if (!user) {
            console.log("User not found:", email); // Log if user is not found
            return res.status(400).json({ errors: { email: 'User not found' } });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Invalid password for user:", email); // Log if password is invalid
            return res.status(400).json({ errors: { password: 'Invalid password' } });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
        res.json({ access_token: token, user });
    } catch (error) {
        console.error('Error during login:', error); // Log any errors
        res.status(500).json({ errors: { server: 'Internal server error' } });
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
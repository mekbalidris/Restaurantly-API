const User = require('../models/users.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generateToken = require('../utils/generateToken')


exports.register = async (req, res) => {
    const { name, email, password} = req.body

    try{
        const existingUser = await User.findOne( {email} )
        if(existingUser){
            return res.status(400).json({ errors: { email: "Email already in use"} })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User( {name, email, password: hashedPassword} )
        await newUser.save()

        res.status(201).json({
            access_token: generateToken(newUser._id),
            user: newUser
        })
    }catch(err){
        console.error("Error creating user", err)
        res.status(500).json({ errors: { server: "Internal server error"}})
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        
        // Ensure user exists before proceeding
        if (!user) {
            return res.status(400).json({ errors: { email: 'User not found' } });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ errors: { password: 'Invalid password' } });
        }

        // Generate and return JWT token
        res.json({ access_token: generateToken(user._id), user });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ errors: { server: 'Internal server error' } });
    }
};
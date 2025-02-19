const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { messageController } = require('./messagesController')
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors({
    origin: "https://restaurantly-one.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

connectDB();

app.use('/api', authRoutes);

app.post('/', messageController)

app.listen(process.env.PORT, () => {
    console.log('Server running on port');
});

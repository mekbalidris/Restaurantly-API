const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api', authRoutes);

app.listen(3001, () => {
    console.log('Server running on port 3001');
});

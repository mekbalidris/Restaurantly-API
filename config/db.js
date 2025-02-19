const mongoose = require('mongoose');
require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI)
        console.log("connected to MongoDB")
    }catch(err){
        console.log("Failed to connect to MongoDB", err)
    }
}

module.exports = connectDB;
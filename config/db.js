const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://mekbalidriss:idris2005@backenddb.7c6z7.mongodb.net/Restaurantly-RestAPI')
        console.log("connected to MongoDB")
    }catch(err){
        console.log("Failed to connect to MongoDB", err)
    }
}

module.exports = connectDB;
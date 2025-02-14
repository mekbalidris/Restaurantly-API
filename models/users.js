const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
}, {collection: 'users'})

const UsersModel = mongoose.model("users", UsersSchema)
module.exports = UsersModel
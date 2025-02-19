const mongoose = require('mongoose')

const messages = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {collection: 'messages'})

module.exports = mongoose.model('messages', messages)
const mongoose = require('mongoose')

const TableBookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tableNumber: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    hour: {
        type: String,
        required: true,
    },
    numberOfPeople: {
        type: Number,
        required: true,
        min: 1,
    },
    foodChoices: {
        type: Map, 
        of: Number, 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {collection: 'table'})

module.exports = mongoose.model('table', TableBookingSchema)
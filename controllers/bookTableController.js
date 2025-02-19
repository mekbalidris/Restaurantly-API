const Table = require('../models/table')

exports.bookTableController = async (req,res) => {
    const { name, tableNumber, date, hour, 
        numberOfPeople, foodChoices} = req.body

    try {
        const newBooking = new Table({
            name,
            tableNumber,
            date: new Date(date), 
            hour,
            numberOfPeople,
            foodChoices,
        })

        await newBooking.save()

        res.status(201).json({
            message: "Table booked successfully!",
            booking: newBooking,
        })
    }catch(err){
        console.error("Error booking table:", err)
        res.status(500).json({ error: "Internal server error"})
    }
}
const Table = require('./models/messages')

exports.messageController = async (req,res) => {
    const { name, email, subject, message} = req.body

    try {
        const newMessage = new Table({
            name,
            email,
            subject, 
            message,
        })

        await newMessage.save()

        res.status(201).json({
            sucess: true,
            message: "message sent successfully!",
            data: newMessage,
        })
    }catch(err){
        console.error("Error Sending message:", err)
        res.status(500).json({ error: "Internal server error"})
    }
}
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorizatino')

    if(!token) {
        return res.status(401).json({ errors: {auth: "No token, authorization denied"}})
    }

    try{
        const decoded = jwt.verify(token, "secret-key")
        req.user = decoded.id 
        next()
    }catch(err){
        res.status(401).json({ errors: { auth: "Token is not valid"}})
    }
}

module.exports = authMiddleware
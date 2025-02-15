const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({ id }, 'secret-key', { expiresIn: '24h' })
}

module.exports = generateToken
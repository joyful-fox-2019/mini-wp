const bcrypt = require('bcryptjs')

const salt = Number(process.env.SALT)

function hashPassword (payload) {
    return bcrypt.hashSync(payload, salt)
}

function compare (password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    hashPassword,
    compare
}
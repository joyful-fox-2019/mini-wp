const bcryptjs = require('bcryptjs')

function hashPassword(password) {
    const saltRounds = 10
    const hashedPassword = bcryptjs.hashSync(password, saltRounds)
    return hashedPassword
}

module.exports = hashPassword
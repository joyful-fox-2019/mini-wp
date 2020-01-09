const bcrypt = require('bcryptjs')

module.exports = {
    hash(password) {
        return bcrypt.hashSync(password, 10)
    },
    compare(password, dbPassword) {
        return bcrypt.compareSync(password, dbPassword)
    }
}
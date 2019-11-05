const bcryptjs = require('bcryptjs')

module.exports = {
  hashPassword: (password) => {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))
  },
  comparePassword: (password, hashedPassword) => {
    return bcryptjs.compareSync(password, hashedPassword)
  }
}
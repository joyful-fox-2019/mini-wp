const bcrypt = require('bcrypt');

const hashPassword = (input) => {
	const salt = bcrypt.genSaltSync(10)
	return bcrypt.hashSync(input, salt)
}

const verifyPassword = (input, hashPassword) => {
	return bcrypt.compareSync(input, hashPassword)
}

module.exports = {
	hashPassword: hashPassword,
	verifyPassword: verifyPassword
}
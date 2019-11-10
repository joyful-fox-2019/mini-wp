const crypt = require('bcryptjs');

module.exports = {
	hash(password) {
		return crypt.hashSync(password, 10);
	},
	verify(password, hashedPassword) {
		return crypt.compareSync(password, hashedPassword);
	}
};

const User = require('../models/user.js');
const verifyPassword = require('../helpers.jwt').verifyPassword;

const UserController {
	static create(req, res) {
		User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		})
		.then(( result ) => {
			res.status(200).json(result)
		})
		.catch(( err ) => {

		})
	}

	static login(req, res) {
		User.findOne({ email: req.body.email })
		.then(( user ) => {
			let checkedPassword = verifyPassword(req.body.password, user.password)

			if( checkedPassword ) {
				let jwt_token = generateToken({ id: user._id, email: user.email })
			}
		})
	}
}
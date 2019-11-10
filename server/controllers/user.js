const { User } = require('../models');
const { verify } = require('../helpers/passwordHandler');
const { encode } = require('../helpers/tokenHandler');

class UserController {
	static signIn(req, res, next) {
		User.findOne({ $or: [{ username: req.body.emailUsername }, { email: req.body.emailUsername }] })
			.then(user => {
				if (!user.password) throw { status: 401, message: 'Email registered by third party' };
				try {
					if (user && verify(req.body.password, user.password)) {
						const access_token = encode(user);
						res.status(200).json({
							message: 'Signed in',
							access_token
						});
					} else {
						throw { status: 401, message: 'Invalid username/password' };
					}
				} catch (err) {
					throw err;
				}
			})
			.catch(next);
	}

	static signUp(req, res, next) {
		User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			full_name: req.body.full_name
		})
			.then(user => {
				const access_token = encode(user);
				res.status(201).json({
					message: 'Signed up',
					access_token
				});
			})
			.catch(next);
	}

	static googleSign(req, res, next) {}

	static getStatus(req, res, next) {
		User.findById(req.payload.id)
			.then(user => {
				if (user) res.status(204).json();
				else throw { status: 401, message: 'Authentication failed' };
			})
			.catch(next);
	}
}

module.exports = UserController;

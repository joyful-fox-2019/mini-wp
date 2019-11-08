import { Schema, model, models } from 'mongoose';
const { hash } = require('../helpers/passwordHandler');

const userSchema = new Schema({
	username: {
		type: String,
		validate: {
			validator(val) {
				return models.User.findOne({ username: val }).then(user => {
					return !user;
				});
			},
			msg: 'Username must be unique'
		}
	},
	email: {
		type: String,
		required: [true, 'Email required'],
		validate: [
			{
				validator(val) {
					return models.User.findOne({ email: val }).then(user => {
						return !user;
					});
				},
				msg: 'Email must be unique'
			},
			{
				validator(val) {
					return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						val
					);
				},
				msg: 'Invalid email'
			}
		]
	},
	password: {
		type: String,
		required: [
			() => {
				return this.username;
			},
			'Password required'
		],
		minlength: [6, 'Password length at least 6']
	},
	full_name: {
		type: String
	}
});

userSchema.post('validate', function(user, next) {
	if (user.password) {
		user.password = hash(user.password);
	}
	next();
});

const User = model('User', userSchema);

module.exports = User;

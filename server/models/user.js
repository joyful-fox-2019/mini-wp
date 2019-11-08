const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hashPassword = require('../helpers/bcrypt.js').hashPassword;

const userSchema = new Schema({
	name: String,
	email: {
		type: String,
		validate: [
			{
				validator: function(v) {
					return 
				},
				message: 'invalid email format'
			},
			{
				validator: function(u) {
					return User.findOne({email: u}).exec()
							.then(found => {
								if( found ) {
									return false
								}
							})
				},
				message: 'email already registered'
			}
		]
	},
	password: {
		type: String,
		default: "rahasia"
	}
});

userSchema.pre('save', (next) => {
	this.password = hashPassword(this.password);
	next();
}

userSchema.pre('findOneAndUpdate', (next) => {
	let updateValue = this._update;
	if(updateValue.password) {
		updateValue.password = hashPassword(updateValue.password)
	}
	next();
})

const User = monngoose.model('User', userSchema);

module.exports = User
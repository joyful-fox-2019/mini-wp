const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'name can not be empty']
    },
    email: {
        type: String,
        required: [true, 'email can not be empty'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address. Must include "@" and "." '],
        unique: [true, `email already registered`]
    },
    password: {
        type: String,
        required: [true, `password can't be empty`],
        minlength: [6, "Password must be more than 5 characters"]
    }
})

UserSchema.pre('save', function () {
    this.password = hashPassword(this.password)
})

const User = mongoose.model('Users', UserSchema)

module.exports = User
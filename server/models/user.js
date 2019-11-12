const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address.'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ]
    },
    password: {
        type: String,
        // validate: {
        //     validator(value) {
        //         if (User.isGoogle == true) {
        //             this.password.required = false
        //         }
        //     }
        // },
        required: [true, "Please enter your password"]
    },
    isGoogle: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', function (next) {
    if (this.isGoogle == false) {
        this.password = hash(this.password)
        next()
    } else {
        this.password = hash(process.env.PASSWORD_USER)
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User


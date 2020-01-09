const {
    Schema,
    model
} = require('mongoose')
const {
    hash
} = require('../helpers/bcrypt')

const userSchema = new Schema({
    full_name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter your email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [7, 'Minimum password length is 7']
    }
}, {
    timestamps: true,
    versionKey: false
})

userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    this.full_name = this.email.match(/^([^@]*)@/)[1]
    next()
})

const User = model('User', userSchema)

module.exports = User
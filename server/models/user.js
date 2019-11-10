const mongoose = require('mongoose')
const hashPassword = require('../helpers/hashPassword')
const Schema = mongoose.Schema
const mongooseValidator = require('mongoose-validator')

let userSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [
            mongooseValidator({
                validator: 'isEmail',
                message: 'Invalid email format'
            })
        ]
    },
    password: {
        type: String
    },
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    notifications: []
})

userSchema.pre('save', function(next){ 
    this.password = hashPassword(this.password)
    next()
})

let User = mongoose.model('User', userSchema)

module.exports = User
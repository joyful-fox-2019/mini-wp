const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/hash')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is not valid'],
        validate: {
            validator: function(v){
                return this.model('User').findOne({ email: v })
                    .then(email =>{
                        return email ? false : true
                    })
            },
            message: props => `${props.value} is already used by another user`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    },
    profilePic: {
        type: String
    }
})

userSchema.pre('save', function(done){
    this.password = hash(this.password)
    done()
})

module.exports = mongoose.model('User', userSchema)
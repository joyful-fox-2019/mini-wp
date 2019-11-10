const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const generateHash = require('../helpers/generateHash')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input your name!']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please input your email address!'],
    validate: [
      { // check if email format is correct
        validator: function(email) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(email).toLowerCase());
        },
        message: props => `${props.value} is not a valid email address!`
      }
    ]
  },
  password: {
    type: String,
    required: [true, 'Please input your password!'],
    minlength: [7, 'Your password is too short! Please input a password betwen 7-20 characters.'],
    maxlength: [20, 'Your password is too long! Please input a password betwen 7-20 characters.']
  },
  picture: {
    type: String
  }
}, {
  timestamps: true
})

userSchema.pre('save', function(next) {
  const currentPassword = this.password
  this.password = generateHash(currentPassword)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, `Username is required!`]
  },
  email: {
    type: String,
    required: [true, `Email is required!`],
    match: [/^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email format."],
    validate: {
      validator(email) {
        return new Promise((resolve, reject) => {
          User.findOne({ email })
            .then(user => user ? resolve(false) : resolve(true))
        })
      },
      message: `Email is alredy taken!`
    }
  },
  password: {
    type: String,
    required: [true, `Password is required!`]
  }
})

UserSchema.pre('save', function (next) {
  this.password = hashPassword(this.password)
  next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User
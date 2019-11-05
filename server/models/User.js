const mongoose = require('mongoose')
const { Schema } = mongoose
const { hashPassword } = require('../helpers/bcryptjs')

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
    unique: true
  },
  password: {
    type: String
  },
  isGoogle: {
    type: Boolean
  }
})

userSchema.pre('save', function() {
  this.password = hashPassword(this.password)
})

module.exports = mongoose.model('User', userSchema)
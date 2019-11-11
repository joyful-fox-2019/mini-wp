const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {hashPassword} = require('../helpers/hashPassword')

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Need Email'],
    uniqute: [true, 'that email has been used'],
    match = [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    minlengt: [6, 'password need to be at least 6 characters long']
  }
})

userSchema.pre('save', function(next){
  this.password = hashPassword(this.password)
  next()
})

module.exports = mongoose.model('User', userSchema)

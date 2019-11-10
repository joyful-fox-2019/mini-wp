const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
})

userSchema.plugin(uniqueValidator, {message: '{PATH} already taken'})

const User = mongoose.model('User', userSchema);

module.exports = User
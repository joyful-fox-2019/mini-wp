const { Schema, model } = require('mongoose')

let userSchema = new Schema ({
  name : {
    type: String,
    required : [true, 'Please input your name']
  },
  email : {
    type: String,
    required : [true, 'Please input your email']
  },
  password : {
    type: String,
    required: [true, 'Please input your password']
  }
}, {timestamps: true})

const User = model('User', userSchema)

module.exports = User
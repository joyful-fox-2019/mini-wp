const mongoose = require('mongoose')
const { Schema, model } = mongoose
const { genHash } = require('../helpers/bcrypt')

const userSchema = new Schema({
  name: {type: String, required: [true, 'Name is required']},
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'],
    validate: {
      validator: function (value) {
        User.findOne({ email: value })
          .then(user => {
            if(user) return false
          })
      }, message: 'Email address is already taken.'
    }
  },
  password: {
    type: String,
    required: [ true, 'Password is required'],
    minlength: [6 , 'Password is minimum of 6 chars']
  }
}, { timestamps: true, versionKey: false })

userSchema.pre('save', function(next) {
  this.password = genHash(this.password)
  next()
})

const User = model('User', userSchema)

module.exports = User
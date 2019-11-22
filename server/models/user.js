const { Schema, model } = require('mongoose')
const bcrypt = require('../helpers/bcrypt')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input your name']
  },
  profPic: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Please input your email address'],
    validate: [{
      validator: function (v) {
        let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        return emailRegex.test(v)
      },
      message: props => `${props.value} is not a valid email address`
    }, {
      validator: function (value) {
        return User.find({
          _id: { $ne: this._id },
          email: value
        })
          .then(data => {
            if (data.length !== 0) {
              throw new Error('E-mail has been used & registered!')
            }
          })
          .catch(err => {
            throw err
          })
      },
      message: props => `${props.value} has already been used!`
    }]
  },
  password: {
    type: String,
    required: [true, 'Please input your password']
  },
  hasLiked: {
    type: Boolean
  }
}, { timestamps: true });

userSchema.pre('save', function (next) {
  this.email = this.email.toLowerCase()
  this.password = bcrypt.hash(this.password)
  next()
})

const User = model('User', userSchema)

module.exports = User
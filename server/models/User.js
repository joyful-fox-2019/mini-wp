const mongoose = require('mongoose')
const { Schema } = mongoose
const { hashPassword } = require('../helpers/bcryptjs')

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name cannot be empty']
  },
  lastName: {
    type: String,
    required: [true, 'Last name cannot be empty']
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
    unique: true,
    validate: {
      validator: (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      message: props => `${props.value} is not a valid email format!`
    },
    validate: {
      validator: function(email) {
        if(!this.isGoogle) {
          if(!this.password || this.password.length < 6) {
            return false
          }
        }
        return true
      },
      message: props => `Password have to be at least 6 characters`
    }
  },
  password: {
    type: String
  },
  isGoogle: {
    type: Boolean
  }
}, {
  versionKey: false
})

userSchema.pre('save', function() {
  try {
    if(!this.isGoogle) {
      this.password = hashPassword(this.password)
    } else {
      if(this.password || this.password === '') {
        throw {status: 400, msg: 'Cannot set password when using google sign in'}
      }
    }
    next()
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('User', userSchema)
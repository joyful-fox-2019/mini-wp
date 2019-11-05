const mongoose = require('mongoose')
const { Schema } = mongoose
const { hashPassword } = require('../helpers/bcryptjs')

const userSchema = new Schema({
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
    }
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
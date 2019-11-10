const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { generateHash, compareHash } = require('../middlewares/bcrypt')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
  };

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required!']
      },
    email: {
        type: String,
        required: [true, 'email is required!'],
        validate: [validateEmail, 'Validation Email Error']
      },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [8, 'password min 8 char']
      },
    profile_img: String

})

userSchema.pre('save', function(next) {
    this.password = generateHash(this.password);
    this.profile_img = 'https://storage.cloud.google.com/newminiwp/157310485641659162520-blanco-perfil-de-usuario-icono-en-el-boto%CC%81n-negro-aislado-en-blanco.jpg?authuser=1';
    next()
  })

const User = mongoose.model('user', userSchema)

module.exports = User


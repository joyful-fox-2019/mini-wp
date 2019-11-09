const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {hashPassword} = require('../helpers/hash')

const UserSchema = new Schema({
    username : {type : String, required : [true, 'username is required'], unique : true},
    email : {type : String, required : [ true, 'email is required'], unique : true},
    password : {type : String, required : [ true, 'password is required'], minlength: [6 , 'less than 6 characters']},
    articlesId : [{ type: Schema.Types.ObjectId, ref: 'Article' }]
})

UserSchema.pre('save', function(next){
    this.password = hashPassword(this.password)
    next()
})

UserSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); 
 }, 'Email Format is Wrong')

const User = mongoose.model('User', UserSchema)

module.exports = User
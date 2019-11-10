const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getHash = require('../helpers/bcrypt').getHash

const users = new Schema({

  username:{
    type : String,
    required : [true,'Username is required']
  },
  email : {
    type : String,
    required : [true,'Email is required'],
    match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Email format invalid'],
  },
  password : {
    type : String,
    required : [true, 'Password is required']
  },
  articles : [{
    type : Schema.Types.ObjectId,
    ref : 'Article'
  }],
  loginBy : {
    type : String,
    default : 'web'
  },
  bookmarks : [{
    type : Schema.Types.ObjectId,
    ref : 'Article'
  }]

},{
  timestamps : true
})

users.pre('save',function(next){
  if(this.password.length < 6){
    next({status : 400, message : 'Password must be more than 6 char'}) // cek lagi atau ngga pake built in validator mongoose
  } else { 
    this.password = getHash(this.password)
    next()
  }
})


const User = mongoose.model('User',users)
module.exports = User
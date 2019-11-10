const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema

const articles = new Schema({

  title:{
    type : String,
    required : [true, 'Title is required'],
    unique:  true
  },
  content : {
    type : String,
    required : [true, 'Content is required']
  },
  tags : [String],
  userId : {
    type : Schema.Types.ObjectId,
    ref: 'User'
  },
  draft : {
    type : Boolean,
    default : false
  },
  image : {
    type : String
  },
  slug : {
    type : String
  }
},{
  timestamps : true,
})

articles.pre('save',function(next){
  this.slug = this.title.split(" ").join("-")
  next()
})

articles.plugin(uniqueValidator, { message: 'This {PATH} has been use by other user. Please consider to change it' });

const Article = mongoose.model('Article',articles)
module.exports = Article
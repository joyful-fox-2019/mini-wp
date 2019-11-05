const { Schema, model } = require('mongoose')

const articleSchema = new Schema({
  title : {
    type : String, 
    required : [true, `Please define the title`]
  },
  content : {
    type : String,
    required : [true, `Please insert the content`]
  },
  imgSrc : {
    type : String
  },
  tags : [{
    type : String, 
  }]
}, {
  timestamps : {
    createdAt: 'created_at'
  }
})

const Article = model('Article', articleSchema)

module.exports = Article
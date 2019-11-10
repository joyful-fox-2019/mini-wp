const { Schema, model } = require('mongoose')
const ObjectId = Schema.Types.ObjectId

const articleSchema = new Schema({
  UserId: {
    type: ObjectId,
    ref: 'User'
  },
  imgUrl: {
    type: String
  },
  title: {
    type: String,
    required: "Title required"
  },
  description: {
    type: String,
    required: "Description required"
  },
  tags: [String],
  slug:{
    type: String,
    required: "Slug required"
  }
}, { timestamps:true, versionKey:false })

articleSchema.path('title').validate(function(value){
  return Article.findOne({ title: value })
  .then(user => {
    if(user) return false
  })
}, 'The title has been used in another article!')

const Article = model('Article', articleSchema)
module.exports = Article

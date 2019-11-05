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
  tags: [String]
}, { timestamps:true, versionKey:false })

const Article = model('Article', articleSchema)
module.exports = Article

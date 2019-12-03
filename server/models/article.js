const mongoose = require('mongoose')
const { Schema } = mongoose

const articleSchema = new Schema({
  title: {
    type: String,
    required: [ true, 'Title Must be Filled']
  },
  content: {
    type: String, 
    required: [ true, 'Content Must be Filled']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tag: [{
    type: String,
  }],
  img: {
    type: String
  }
}, { timestamps: true })

const Article = mongoose.model('Article', articleSchema)
module.exports = Article
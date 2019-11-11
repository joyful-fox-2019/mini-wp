const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: [true, `Title is required!`]
  },
  content: {
    type: String,
    required: [true, `Content is required!`]
  },
  tag: [],
  url: {
    type: String,
    required: [true, `Image is required!`]
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  key: {
    type: String,
    required: [true, `Key is required!`]
  },
  publish: {
    type: Boolean
  }
}, {
  timestamps: true
  })

const Article = mongoose.model('Article', ArticleSchema)
module.exports = Article
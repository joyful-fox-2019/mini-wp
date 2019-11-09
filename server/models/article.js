const mongoose = require('mongoose')
const { Schema, model } = mongoose

const articleSchema = new Schema({
  title: {
    type: String, 
    required: [true, 'title is required']
  },
  content: {
    type: String, 
    required: [ true, 'content cannot be empty']
  },
  image: {
    type: String
  },
  tags: [{ type: String }],
  reads: {
    type: Number,
    default: 0
  },
  status: {
    type: String
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true, versionKey: false})

const Article = model('Article', articleSchema)

module.exports = Article

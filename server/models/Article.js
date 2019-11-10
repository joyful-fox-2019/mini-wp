const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const articleSchema = new Schema({
  title: String,
  content: String,
  imageUrl: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Article', articleSchema)
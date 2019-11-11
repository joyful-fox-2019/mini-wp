const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  createdAt: Date,
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Post', postSchema)

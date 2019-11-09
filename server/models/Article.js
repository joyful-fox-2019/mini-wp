const mongoose = require('mongoose')
const { Schema } = mongoose

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title cannot be empty']
  },
  subtitle: {
    type: String,
    required: [true, 'Subtitle cannot be empty']
  },
  description: {
    type: String,
    required: [true, 'Please write something for the article']
  },
  tags: [{
    type: String,
    required: [true, 'You must add at least one topic']
  }],
  image: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  versionKey: false,
  timestamps: true
})

module.exports = mongoose.model('Article', articleSchema)
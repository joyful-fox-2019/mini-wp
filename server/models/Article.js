const mongoose = require('mongoose')
const { Schema } = mongoose

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title cannot be empty']
  },
  content: {
    type: String,
    required: [true, 'Content cannot be empty']
  },
  tags: [{
    type: String
  }],
  image: {
    type: String
  },
  user: Schema.Types.ObjectId
},
{
  versionKey: false,
  timestamps: true
})

module.exports = mongoose.model('Article', articleSchema)
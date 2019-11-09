const mongoose = require('mongoose')
const { Schema } = mongoose

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title cannot be empty']
  },
  description: {
    type: String,
    required: [true, 'Description cannot be empty']
  },
  tags: [{
    type: String,
    required: [true, 'You must add at least one topic']
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
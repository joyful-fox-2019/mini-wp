const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [400, 'Description is to short']
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tags:[{
    type: String
  }],
  picture: {
    type: String,
    required: [true, 'Image is empty']
  }
},{
  timestamps: true
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article
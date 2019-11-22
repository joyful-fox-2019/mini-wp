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
  },
  slug: {
    type: String,
    validate: {
      validator: function (value) {
        return Article.find({ slug: value})
          .then(article => {
            if(article.length > 1) return false
          })
      },
      message: props => 'Title is not available at this moment'
    }
  }
}, { timestamps: true, versionKey: false})

articleSchema.pre('validate', function(next) {
  let date = new Date().toDateString().toLowerCase().slice(4).split(' ').join('-')
  let title = this.title.toLowerCase().split(' ').join('-')
  this.slug = `${date}-${title}`
  next()
})
const Article = model('Article', articleSchema)

module.exports = Article

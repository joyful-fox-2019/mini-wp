const { Schema, model } = require('mongoose')

const articleSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, `Please input your article's title`]
  },
  content: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
  },
  slug: {
    type: String
  },
  isActive: {
    type: Boolean
  },
  tags: {
    type: Array
  }
}, { timestamps: true })

articleSchema.pre('save', function (next) {
  this.slug = this.title.toLowerCase().split(" ").join("-")
  next()
})

const Article = model('Article', articleSchema)

module.exports = Article;
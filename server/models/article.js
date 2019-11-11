const { Schema, model } = require('mongoose')

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    content: {
        type: String,
        required: [true, `content must be filled`]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    featured_image: {
        type: String,
        default: ""
    },
    tags: [{
        type: String
    }]
}, { timestamps: true })

const Article = model('Article', articleSchema)

module.exports = Article
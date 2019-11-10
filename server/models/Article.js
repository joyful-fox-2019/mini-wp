const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema ({
    title: {
        type: String,
        required: [true, `title can't be empty`]
    },
    content: {
        type: String,
        required: [true, `content can't be empty`]
    },
    author: String,
    UserId: String,
    featured_image: String,
    tags : {
        type: Array,
        required: [true, `tags can't be empty`]
    },
    like: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    comment: Array
}, {
    timestamps: true
})

const Article = mongoose.model('Articles', ArticleSchema)
module.exports = Article
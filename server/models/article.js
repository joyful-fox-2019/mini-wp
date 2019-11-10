const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title can\'t be empty'],
        unique: 'Title already taken'
    },
    content: {
        type: String,
        required: [true, 'content can\'t be empty']
    },
    image: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    author: {
        type: String,
        require: [true, 'author can\'t be empty, you can use an aliase']
    }
}, { timestamps: { createdAt: 'createdAt' } })

const Article = mongoose.model('article', articleSchema)

module.exports = Article
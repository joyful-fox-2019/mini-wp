const mongoose = require('mongoose')
const Schema = mongoose.Schema

let postSchema = new Schema ({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    img: {
        type: String
    },
    tags: [{
        type: String,
        ref: 'Tags'
    }],
    like: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

let Post = mongoose.model ('Post', postSchema)

module.exports = Post
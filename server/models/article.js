const { Schema, model } = require('mongoose')

const articleSchema = new Schema (
    {
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        content: {
            type: String,
            required: [true, 'Content is required']
        },
        created_at: Date,
        user_id: String
    }
)

const Article = model('Article', articleSchema)
module.exports = Article
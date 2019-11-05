const {
    Schema,
    model
} = require('mongoose')

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please input title of your article']
    },
    content: {
        type: String,
        required: [true, 'Please input the content of your article']
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})

const Article = model('Article', articleSchema)

module.exports = Article
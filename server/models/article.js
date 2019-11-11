const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = Schema.Types.ObjectId;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date
    },
    image: {
        type: String
    },
    author: {
        type: ObjectId,
        ref: 'User'
    }
})

articleSchema.pre('save', function (next) {
    this.created_at = new Date().toISOString()
    next()
})

const Article = model('Article', articleSchema);
module.exports = Article;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title:{
        type: String
    },
    content:{
        type: String
    },
    created_at:{
        type: Date
    },
    author:{
        type: String
    },
    featured_image:{
        type: String
    },
    updated_at:{
        type: Date,
        default: null
    }
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article;
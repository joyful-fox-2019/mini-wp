const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleShema = new Schema({
    title:  {
        type: String,
        required: [true, 'Article title can not be empty.']
    },
    content: {
        type: String,
        required: [true, 'Article content can not be empty.']
    }
},{
    timestamps: true
});

const Article = mongoose.model('Article', articleShema);

module.exports = Article;
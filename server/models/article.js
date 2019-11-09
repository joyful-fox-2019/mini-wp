const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title : {type : String, required : [true, 'title is required']},
    tag : {type : String, required : [true, 'tag is required']},
    content : {type : String, required : [true, 'content is required']},
    createdAt : {type : Date, required : [true,  'date is required']},
    author : {type : String, required : [true, 'author is required']},
    featured_image : {type : String, default : 'https://i2.wp.com/www.scribblesandcrumbs.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg?w=1170'}

})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
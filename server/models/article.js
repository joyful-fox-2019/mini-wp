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
        type: Date,
        default: Date.now
    },
    author:{
        type: String
    },
    featured_image:{
        type: String,
        default: "https://image.freepik.com/free-photo/education-concept-student-studying-brainstorming-campus-concept-close-up-students-discussing-their-subject-books-textbooks-selective-focus_1418-626.jpg"
    },
    updated_at:{
        type: Date,
        default: null
    }
},
{
    versionKey: false
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article;
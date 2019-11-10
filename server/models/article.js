`use strict`
const {Schema, model} = require('mongoose')

const articleScheme = new Schema({
    title : {
        type : String,
        require : [true, 'you must fill this field']
    },
    content : {
        type : String,
        require : [true, 'you must fill this field']

    },
    createdAt : {
        type : Date,
        require : [true, 'you must fill this field'],
        default : new Date

    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    updatedAt : {
        type : Date,
        default : new Date
    },
    featured_image : {
        type : Buffer
    }
})

const Article = new model('Article', articleScheme)
module.exports = Article
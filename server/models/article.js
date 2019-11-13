const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ArticleSchema = new Schema({
    title : {
        type : String,
        required : [true, 'title is required']
    },
    content : {
        type : String
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    imageUrl : {
        type : String,
    }
},{
    timestamps: true,
    versionKey: false
})

// ArticleSchema.pre('save',function(next){
//     this.created_at = new Date().toISOString()
//     next()
// })

module.exports = model('Article',ArticleSchema)
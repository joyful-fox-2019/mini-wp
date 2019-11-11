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
    image : {
        type : Array,
        validate : {
            validator : function(value){
                return value.length > 0 ? true : false
            },
            message: props => `image is required`
        }
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
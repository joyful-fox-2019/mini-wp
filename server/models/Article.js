const { Schema, model } = require('mongoose')

let articleSchema = new Schema({
    title : {type:String,required: [true, 'username is required']},
    content : {type:String,required: [true, 'username is required']},
    author : {
        type:  Schema.Types.ObjectId,
        ref:'User'
    },
    featured_image: {
        type: String,
        default: 'https://storage.cloud.google.com/mini-temp-bucket/article.jpg'
    },
    tags : [{
        type: String
      }]
},{ timestamps:true,versionKey:false })

let Article = model('Article',articleSchema)

module.exports = Article
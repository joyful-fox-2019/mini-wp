const mongoose = require('mongoose')

let Schema = mongoose.Schema

let articleSchema = new Schema({
    title: {
      type:String,
      required: [true, 'Title is required']
    },
    content: {
      type:String,
      required: [true, 'Content is required']
    },
    featured_image: {
      type:Array,
      validate: {
        validator: function(v) {
            if(v.length > 0){
                return true
            }
            else{
                return false
            }
        },
        message: props => `Image is required`
      }
    },
    tags: {
      type:Array,
      validate: {
        validator: function(v) {
            if(v.length > 0){
                return true
            }
            else{
                return false
            }
        },
        message: props => `Tags is required`
      }
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
}, 
{
  timestamps:true,
  versionKey: false
})

let Article = mongoose.model('Article',articleSchema)

module.exports = Article
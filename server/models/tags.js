const mongoose = require('mongoose')
const Schema = mongoose.Schema

let tagsSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

const Tags = mongoose.model('Tags', tagsSchema)

module.exports = Tags
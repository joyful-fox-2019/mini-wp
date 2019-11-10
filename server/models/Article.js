const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    tags: [{
        type: String
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    file: {
        type: String
    },
    reader: {
        type: Number,
        default: 0
    },
    upvotes: [
        {
          type: ObjectId,
          ref: 'User'
        }
      ],
    downvotes: [
        {
          type: ObjectId,
          ref: 'User'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);

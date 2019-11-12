const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, `Title is required`],
        minlength: [3, `Minimum title length is 3`]
    },
    content: {
        type: String,
        required: [true, `Content is required`]
    },
    author: {
        type: String,
        required: [true, `Author is required`]
    },
    featured_image: {
        type: String,
        default: null
    },
    tags: [String],
    status: {
        type: Boolean,
        default: true
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
});

const Article = model("Article", articleSchema);

module.exports = Article;
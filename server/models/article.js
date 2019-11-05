const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, `Title is required.`],
        minlength: [3, `Minimal title length is 3.`]
    },
    content: {
        type: String,
        required: [true, `Content is required.`]
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
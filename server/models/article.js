const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const articleShcema = new Schema({
    title: String,
    content: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    img: String

}, {
    timestamps: true
});


const Article = mongoose.model("Article", articleShcema)
module.exports = Article;
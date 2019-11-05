const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const articleShcema = new Schema({
    title: String,
    content: String,
    username: String

}, {
    timestamps: true
});


const Article = mongoose.model("Article", articleShcema)
module.exports = Article;
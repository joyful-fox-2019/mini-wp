const {Schema, model} = require('mongoose');

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter a title"]
    },
    content: {
        type: String
    },
    featureImage:{
        type: String
    },
    UserId: {
        type: Schema.Types.ObjectId, ref:'User',
    }
},{
    timestamps: true
})

const Article = model('Article', articleSchema);

module.exports = Article;
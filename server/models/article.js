const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	status: {
		type: String,
		default: 'draft'
	},
	createdAt: {
		type: Date,
		default: new Date()
	}
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
	tags: [{ type: String }]
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article

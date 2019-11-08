const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Title required']
	},
	content: {
		type: String
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	status: {
		type: String,
		enum: ['draft, posted, deleted'],
		default: 'draft'
	},
	created_at: {
		type: Date,
		required: true,
		default: new Date()
	},
	updated_at: {
		type: Date,
		required: true,
		default: new Date()
	}
});

const Article = model('Article', articleSchema);

module.exports = Article;

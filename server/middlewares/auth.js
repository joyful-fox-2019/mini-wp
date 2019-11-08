const { decode } = require('../helpers/tokenHandler');
const { Article } = require('../models');

module.exports = {
	authenticate(req, res, next) {
		try {
			const payload = decode(req.headers.access_token);
			req.payload = payload;
			next();
		} catch (err) {
			next(err);
		}
	},
	authorize(req, res, next) {
		Article.findOne({ id: req.params.id, author: req.payload.id })
			.then(article => {
				if (article) next();
				else throw { status: 403, message: 'Unauthorized access' };
			})
			.catch(next);
	}
};

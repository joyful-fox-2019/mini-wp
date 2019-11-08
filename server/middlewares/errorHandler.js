module.exports = (err, req, res, next) => {
	let status,
		messages = [];

	switch (err.name) {
		case 'ValidationError':
			status = 401;
			for (const path in err.errors) {
				messages.push(err.errors[path].message);
			}
			break;
		case 'JsonWebTokenError':
			status = 401;
			messages = 'Authentication failed';
			break;

		default:
			(status = err.status || 500), (messages = err.message || 'Internal server error');
			break;
	}

	err.name && console.log(err.stack);

	res.status(status).json({
		status,
		messages
	});
};

// Imports
const logger = require('./logger');
const jwt = require('jsonwebtoken');

// Logs requests made to the server to understand what data
// is being sent and retrieved
const requestLogger = (request, response, next) => {
	logger.info('Method: ', request.method);
	logger.info('Path: ', request.path);
	logger.info('Body: ', request.body);
	logger.info('---');
	next();
};

// unknown endpoint error handler when unrecognized route
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

// Error handler depending on type of error
const errorHandler = (error, request, response, next) => {
	if (error.name === 'ValidationError') {
		response.status(400).send(error.message);
	} else if (error.name === 'CastError') {
		response.status(400).send({
			error: 'malformatted id'
		});
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).send({
			error: 'invalid token'
		});
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).send({
			error: 'token expired'
		});
	}
	next(error);
};

// Token extractor function that will get the token from the authorization header
// and put it in the token field of the request object
const tokenExtractor = (request, response, next) => {
	const auth = request.get('authorization');
	if (auth && auth.toLowerCase().startsWith('bearer ')) {
		request.token = auth.substring(7);
	}

	next();
};

// User extractor middleware that will get the user information linked with the
// request and set them to the request.user object
const userExtractor = (request, response, next) => {
	request.user = jwt.verify(request.token, process.env.SECRET);
	next();
};

// Exports
module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
};
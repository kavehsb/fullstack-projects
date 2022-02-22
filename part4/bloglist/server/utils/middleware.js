// Imports
const logger = require('./logger');

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

// Exports
module.exports = {
	requestLogger,
	unknownEndpoint,
};
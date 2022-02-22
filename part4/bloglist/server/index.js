// Imports
const app = require('./app');
const http = require('http');
const { PORT } = require('./utils/config');
const logger = require('./utils/logger');

// Start server with http since express is not imported
const server = http.createServer(app);

// Server instantiated
server.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`);
});
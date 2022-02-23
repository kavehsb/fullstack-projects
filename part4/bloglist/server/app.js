// Imports
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./utils/config');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogRoutes');
const middleware = require('./utils/middleware');

// Connect to the database via the .env MONGODB_URI
mongoose.connect(MONGODB_URI)
	.then(() => logger.info('Connected to MongoDB'))
	.catch(error => logger.error(
		'error connecting to MongoDB: ', error.message
	));

// Middleware
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogsRouter);
app.use(middleware.unknownEndpoint);

// Exports
module.exports = app;
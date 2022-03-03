// Imports
const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./utils/config');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogRoutes');
const userRouter = require('./controllers/userRoutes');
const loginRouter = require('./controllers/login');
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
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// Exports
module.exports = app;
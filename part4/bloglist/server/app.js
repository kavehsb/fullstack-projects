const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./utils/config');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogRoutes');

mongoose.connect(MONGODB_URI)
	.then(() => logger.info('Connected to MongoDB'));

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

module.exports = app;
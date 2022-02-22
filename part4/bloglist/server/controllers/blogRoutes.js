// Imports
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

/**
 * Retrieve all the blog database at the route /api/blogs
 * by querying the MongoDB database via find({}) which
 * indicates we want all of the documents for this specific
 * database. Then sends back the data as a response of type JSON.
 */
blogsRouter.get('/', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs);
		});
});

/**
 * Creates a new blog with the request parameters and
 * saves it to the database. This returns a response with
 * status 201 if successful and the respective request body
 */
blogsRouter.post('/', (request, response) => {
	const blog = new Blog(request.body);

	blog
		.save()
		.then(result => {
			response.status(201).json(result);
		});
});

// Exports
module.exports = blogsRouter;
// Imports
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

/**
 * Retrieve all the blog database at the route /api/blogs
 * by querying the MongoDB database via find({}) which
 * indicates we want all of the documents for this specific
 * database. Then sends back the data as a response of type JSON.
 */
blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	response.send(blogs);
});

/**
 * Creates a new blog with the request parameters and
 * saves it to the database. This returns a response with
 * status 201 if successful and the respective request body
 */
blogsRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body);

	const result = await blog.save();
	response.status(201).send(result);
});

// Exports
module.exports = blogsRouter;
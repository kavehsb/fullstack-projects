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
 * Retrieve a specfic note from the blog database at the route
 * /api/blogs/:id where id is the id of the blog that is requested
 * to be retrieved. This then sends back that specific blog as
 * a response of type JSON.
 */
blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	response.send(blog);
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

/**
 * Deletes a blog at the given api url with a specific id identifier.
 * This must update at the database level and remove the document and only
 * that specific document.
 */
blogsRouter.delete('/:id', async (request, response) => {
	const result = await Blog.findByIdAndRemove(request.params.id);
	if (result) {
		response.status(204).end();
	}
	response.status(404).end();
});

// Exports
module.exports = blogsRouter;
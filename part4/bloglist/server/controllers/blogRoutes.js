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
	if (blog) {
		response.send(blog);
	}
	response.status(404).end();
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
 * Updates a blog resource depending on the input id. This request will update
 * the document for that corresponding blog id at the database level. However,
 * if that document doesn't exist, a 404 will be returned.
 */
blogsRouter.put('/:id', async (request, response) => {
	const result = await Blog.findByIdAndUpdate(request.params.id, request.body);
	if (result) {
		response.status(204).end();
	}
	response.status(404).end();
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
// Imports
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

// Initial DB state
const initialBlogs = [
	{
		'title': 'TestBlog',
		'author': 'Test Person',
		'url': 'fakeurl.com',
		'likes': 0
	},
	{
		'title': 'TestBlog2',
		'author': 'Test Person2',
		'url': 'fakeurl2.com',
		'likes': 0
	}
];

// Clear the db and set it back to the intial state
beforeEach(async () => {
	await Blog.deleteMany({});
	console.log('database cleared');

	const blogObject = initialBlogs.map(blog => new Blog(blog));
	const promises = blogObject.map(blog => blog.save());
	await Promise.all(promises);
	console.log('initial data stored');
});

// Helper variable for get requests to a specific resource
let getID;
describe('get request tests', () => {
	// Test if the returned note from get are in correct format
	test('notes returned from GET are in json format', async () => {
		const response = await api.get('/api/blogs');

		expect(response.status).toBe(200);
		expect(response.type).toBe('application/json');
	});

	// Test GET request for all of the blogs at /api/blogs
	test('get all blogs from /api/blogs', async () => {
		const response = await api.get('/api/blogs');

		expect(response.body).toHaveLength(initialBlogs.length);
	});

	// Test GET request to a specific resource given an id
	test('get blog from /api/blogs/:id', async () => {
		const result = await Blog.findOne();
		getID = result._id.toString();
		const response = await api.get(`/api/blogs/${getID}`);

		expect(response.status).toBe(200);
		expect(response.type).toBe('application/json');
	});

	// Test GET request to nonexistent resource
	test('get blog that doesnt exist returns 404 not found', async () => {
		await api
			.get('/api/blogs/621bdc85c2dc2f03d1707616')
			.expect(404);
	});

	// Test GET request to malformatted id
	test('get blog with malformatted if returns 400 bad request', async () => {
		await api
			.get('/api/blogs/1')
			.expect(400);
	});
});

describe('property tests', () => {
	// Test that each blog has an id property
	test('each blog has an id property', async () => {
		const response = await Blog.find({});

		response.forEach(blog => expect(blog.id).toBeDefined());
	});
});

describe ('post request tests', () => {
	// Test a POST request to the database is successful
	test('create a new blog for the db', async () => {
		const newBlog = {
			title: 'supertest',
			author: 'Kav',
			url: 'apitest.com',
			likes: 0
		};

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-type', /application\/json/);

		const blogsAfter = await Blog.find({});
		expect(blogsAfter.length).toBe(initialBlogs.length + 1);

		const containsBlogTitle = blogsAfter.map(blog => blog.title);
		expect(containsBlogTitle).toContainEqual('supertest');
	});

	// Test that the likes property defaults to 0 if no like input
	test('likes defaults to 0', async () => {
		const blogNoLikes = {
			title: 'blog with no likes',
			author: 'Kav',
			url: 'Nolikestest.com',
		};

		const response = await api
			.post('/api/blogs')
			.send(blogNoLikes);

		expect(response.body.likes).toBe(0);
	});

	// Test that if a title or url property is missing from the request
	// the server will response with status 400 bad request
	test('bad request if missing title/url', async () => {
		const blogNoTitle = {
			author: 'Kav',
			url: 'Notitle.com',
			likes: 0
		};
		const blogNoUrl = {
			title: 'blog no url',
			author: 'Kav',
			likes: 0
		};

		await api
			.post('/api/blogs')
			.send(blogNoTitle)
			.expect(400);

		await api
			.post('/api/blogs')
			.send(blogNoUrl)
			.expect(400);
	});
});

// Helper variable for delete requests to a specific resource
let deleteID;
describe('delete request tests', () => {
	// Test a delete request to a specific blog resource is successful
	test('delete request to single resource successful', async () => {
		const result = await Blog.findOne();
		deleteID = result._id.toString();
		await api
			.delete(`/api/blogs/${deleteID}`)
			.expect(204);
	});

	// Test a delete request to an already deleted resource
	test('delete request to resource already deleted returns 404 not found', async () => {
		await api
			.delete(`/api/blogs/${deleteID}`)
			.expect(404);
	});

	// Test a delete request to a resource with an non existing id
	test('delete request to unidentified resource returns 404 not found', async () => {
		await api
			.delete('/api/blogs/621bdc85c2dc2f03d1707616')
			.expect(404);
	});

	// Test a delete request given a malformatted id
	test('delete request to malformatted if returns 400 bad request', async () => {
		await api
			.delete('/api/blogs/1')
			.expect(400);
	});
});

// Helper variable for put requests at specific id
let putID;
const updatedBlog = {
	title: 'updated',
	author: 'updated',
	url: 'updated.com',
	likes: 10
};
describe('put request tests', () => {
	// Test a put request is successful with an existing blog in the database
	test('put request on existing blog is successful', async () => {
		const result = await Blog.findOne();
		putID = result._id.toString();
		await api
			.put(`/api/blogs/${putID}`)
			.send(updatedBlog)
			.expect(204);

		const blogsAfter = await Blog.find({});
		expect(blogsAfter.length).toBe(initialBlogs.length);

		const containsBlogTitle = blogsAfter.map(blog => blog.title);
		expect(containsBlogTitle).toContain('updated');
	});

	// Test a put request is unsuccessful with a nonexistent blog in the database
	test('put request on nonexistent blog returns 404 not found', async () => {
		await api
			.put('/api/blogs/621bdc85c2dc2f03d1707616')
			.send(updatedBlog)
			.expect(404);
	});

	// Test a put request is unsuccessful with malformatted id
	test('put request with malformatted id returns 400 bad request', async () => {
		await api
			.put('/api/blogs/1')
			.send(updatedBlog)
			.expect(400);
	});
});

// Close the DB connection after tests complete
afterAll(() => {
	mongoose.connection.close();
});
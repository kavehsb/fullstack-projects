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

// Test that each blog has an id property
test('each blog has an id property', async () => {
	const response = await Blog.find({});

	response.forEach(blog => expect(blog.id).toBeDefined());
});

// Close the DB connection after tests complete
afterAll(() => {
	mongoose.connection.close();
});
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
	console.log(blogsAfter);

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

// Close the DB connection after tests complete
afterAll(() => {
	mongoose.connection.close();
});
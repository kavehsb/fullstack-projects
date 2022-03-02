// Imports
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');

// Initial DB state
const initialData = [
	{
		'username': 'Kav123',
		'name': 'Kaveh',
		'password': '$2b$10$C8uQxDzQcg4qC6ncsy6V4OVl2DgXHVI2uopsvVaYbe/4R6lnCV9hC'
	},
	{
		'username': 'test',
		'name': 'Test testerson',
		'password': '$3a$12$C8iQxOzQcg4qC6ncsy7V4OVl2DgXLVI2uopsvVAYbe/4R9lnCV9jK'
	}
];

// To keep consistency of tests before each test we reset the database to
// the initial state
beforeEach(async () => {
	await User.deleteMany({});
	console.log('database cleared');

	const userObject = initialData.map(user => new User(user));
	const promises = userObject.map(user => user.save());
	await Promise.all(promises);
	console.log('initial data stored');
});

// Tests for post requests to the user api
describe('Tests for post requests to the user api', () => {
	test('test creation of a new user is stored to the database', async () => {
		const newUser = {
			username: 'supertest123',
			name: 'supertest',
			password: 'tsetrepus'
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-type', /application\/json/);

		const usersAfter = await User.find({});
		expect(usersAfter.length).toBe(initialData.length + 1);

		const containsUserName = await usersAfter.map(user => user.username);
		expect(containsUserName).toContainEqual('supertest123');
	});
});

// Close db after tests complete
afterAll(() => {
	mongoose.connection.close();
});
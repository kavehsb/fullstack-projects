// Imports
const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


/**
 * Router get request to retrieve basic user information from the database.
 * This information does not include the password or password hash as in the
 * user model we get rid of the password hash for the response JSON
 */
userRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', ({ title: 1, author: 1, url: 1 }));
	response.send(users);
});

/**
 * Router get request to retrieve basic user information from the database for
 * one specfic user given by the id in the request params.
 */
userRouter.get('/:id', async (request, response) => {
	const user = await User.findById(request.params.id).populate('blogs', { title: 1, author: 1, url: 1 });
	if (user) {
		response.send(user);
	}
	response.status(404).end();
});

/**
 * Create a new user and send there information
 * through /api/users to be stored in the database.
 * Using bcrypt, the password being stored in the database
 * is actually a password hash.
 */
userRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body;

	const existingUser = await User.findOne({ username });
	if (existingUser) {
		return response.status(400).send({ error: 'username must be unique' });
	}

	if (!password) {
		return response.status(400).send({ error: 'no password' });
	} else if (password.length < 3) {
		return response.status(400).send({ error: 'password length is less than the minimum 3' });
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const newUser = new User({
		username,
		name,
		password: passwordHash
	});

	const savedUser = await newUser.save();
	response.status(201).send(savedUser);

});

// Exports
module.exports = userRouter;
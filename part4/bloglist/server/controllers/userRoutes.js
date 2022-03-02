// Imports
const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


/**
 * Router get function to retrieve basic user information from the database.
 * This information does not include the password or password hash as in the
 * user model we get rid of the password hash for the response JSON
 */
userRouter.get('/', async (request, response) => {
	const users = await User.find({});
	response.send(users);
});

/**
 * Create a new user and send there information
 * through /api/users to be stored in the database.
 * Using bcrypt, the password being stored in the database
 * is actually a password hash.
 */
userRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body;

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
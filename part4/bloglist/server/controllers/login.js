// Imports
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

/**
 * Login post request to send user information to be compared
 * with the user information currently stored in the database.
 * If the user information in the request is correct, the response
 * will be a token attached to that specific user for authentication.
 */
loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body;

	const user = await User.findOne({ username });
	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.password);

	if (!(user && passwordCorrect)) {
		return response.status(401).send({
			error: 'invalid username or password'
		});
	}

	const userForToken = {
		username: user.username,
		id: user._id
	};

	const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 });
	response.status(200).send({
		token,
		username: user.username,
		name: user.name
	});
});

// Exports
module.exports = loginRouter;
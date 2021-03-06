// Imports
require('dotenv').config();

// .env variables
const PORT = process.env.PORT;
const MONGODB_URI = process.env.NODE_ENV === 'test'
	? process.env.TEST_MONGODB_URI
	: process.env.MONGODB_URI;

// Exports
module.exports = {
	PORT,
	MONGODB_URI
};
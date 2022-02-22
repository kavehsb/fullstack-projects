// Imports
require('dotenv').config();

// .env variables
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Exports
module.exports = {
	MONGODB_URI,
	PORT
};
// Imports
const mongoose = require('mongoose');

// Database schema for a blog document
const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	author: String,
	url: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		default: 0,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

// How the BSON gets returned as JSON
// (we don't want -id and --v to be sent back as a response)
blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

// Exports
module.exports = mongoose.model('Blog', blogSchema);
// Imports
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		minlength: 3,
		required: true
	},
	name: String,
	password: {
		type: String,
		required: true
	},
	blogs: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog'
	}
});

// How the BSON gets returned as JSON
// (we don't want -id, --v, and password to be sent back as a response)
userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.password;
	}
});

// Exports
module.exports = mongoose.model('User', userSchema);
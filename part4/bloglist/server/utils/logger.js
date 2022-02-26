// Check NODE_ENV, if inTesting we don't want logs to clutter testing output
const inTesting = process.env.NODE_ENV === 'test';

// console.log information no error
const info = (...params) => {
	if (!inTesting) {
		console.log(...params);
	}
};

// console.error if error encountered
const error = (...params) => {
	if (!inTesting) {
		console.error(...params);
	}
};

// Exports
module.exports = {
	info,
	error
};
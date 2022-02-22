// console.log information no error
const info = (...params) => {
	console.log(...params);
};

// console.error if error encountered
const error = (...params) => {
	console.error(...params);
};

// Exports
module.exports = {
	info,
	error
};
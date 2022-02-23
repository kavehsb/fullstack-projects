// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
	const sum = blogs.reduce((likes, blog) => {
		return likes + blog.likes;
	}, 0);

	return sum;
};

module.exports = {
	dummy,
	totalLikes
};
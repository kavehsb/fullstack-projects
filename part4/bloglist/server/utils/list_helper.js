// Calculate total number of likes for a list of blogs
const totalLikes = (blogs) => {
	const sum = blogs.reduce((likes, blog) => {
		return likes + blog.likes;
	}, 0);

	return sum;
};

// Find the blog with the most amount of likes and return it
const favoriteBlog = (blogs) => {
	const favorite = blogs.reduce((favBlog, blog) => {
		if (Object.keys(favBlog).length === 0) {
			return filter(blog);
		}
		return filter(favBlog.likes < blog.likes ? blog : favBlog);
	}, {});

	return favorite;
};

// Helper function to filter out properties of a returned blog
const filter = ({ title, author, likes }) => ({ title, author, likes });

// Exports
module.exports = {
	totalLikes,
	favoriteBlog
};
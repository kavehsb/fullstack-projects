// Calculate total number of likes for a list of blogs
const totalLikes = (blogs) => {
	const sum = blogs.reduce((likes, blog) => {
		return likes + blog.likes;
	}, 0);

	return sum;
};

// Find author with most blogs and return the author as well as the number of blogs
const mostBlogs = (blogs) => {

	// Condense the input blog list into a new object with key value pairs
	// being the author and the count of blogs they have written
	const list = blogs.reduce((ret, blog) => {
		// If the author already exists in the accumulator, increment the blogs
		// value
		if (blog.author in ret) {
			ret[blog.author]++;
		} else { // Otherwise the author is new so create a key value pair in the accumulator
			ret[blog.author] = 1;
		}
		return ret;
	}, {});

	let most = {};
	// Iterate through the object returned by the previous reduce to determine
	// which author has written the most blogs and return it
	for (let i in  list) {
		if (Object.keys(most).length === 0 || list[i] > Object.values(most)[1]) {
			most = {
				author: i,
				blogs: list[i]
			};
		}
	}

	return most;
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
	favoriteBlog,
	mostBlogs
};
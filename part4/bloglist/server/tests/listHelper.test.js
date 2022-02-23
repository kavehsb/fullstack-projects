// Imports
const listHelper = require('../utils/list_helper');

// Variable declarations for tests (these are use multiple times during testing)
const listWithOneBlog = [
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	}
];

const listWithMultipleBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0
	}
];

// Test suite for calculating total number of likes of a list of blogs
describe('total likes', () => {

	test('list with one blog equals the likes of that list', () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	});

	test('list with multiple blogs has likes equal to the sum ', () => {
		const result = listHelper.totalLikes(listWithMultipleBlogs);
		expect(result).toBe(38);
	});
});

// Test suite for returning the blog with the most amount of likes
describe('favorite blog', () => {

	// Test if the blog with the most likes is returned from a list of only
	// one blog
	test('favorite blog from list with one blog', () => {
		const result = listHelper.favoriteBlog(listWithOneBlog);
		expect(result).toEqual(
			{
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				likes: 5,
			}
		);
	});

	// Testing if the blog with the most amount of likes is returned from
	// a list of multiple blogs
	test('favorite blog from list of multiple blogs', () => {
		const result = listHelper.favoriteBlog(listWithMultipleBlogs);
		expect(result).toEqual(
			{
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				likes: 12,
			},
		);
	});
});

// Testing if the author who has written the most amount of blogs is returned
// from a list of multiple blogs
describe('most blogs', () => {
	test('author of most blogs given list of blogs', () => {
		const result = listHelper.mostBlogs(listWithMultipleBlogs);
		expect(result).toEqual(
			{
				author: 'Robert C. Martin',
				blogs: 3
			}
		);
	});
});

// Testing if the author who has recieved the most amount of likes on their blogs
// is returned from a list of multiple blogs
describe('most likes on blogs', () => {
	test('author who has recieved most likes on their blogs', () => {
		const result = listHelper.mostLikes(listWithMultipleBlogs);
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17
		});
	});
});
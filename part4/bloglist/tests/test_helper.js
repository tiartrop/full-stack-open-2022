const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "first blog",
    author: "Alice",
    url: "url-1",
    likes: 5,
  },
  {
    title: "second blog",
    author: "Bob",
    url: "url-2",
    likes: 3,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};

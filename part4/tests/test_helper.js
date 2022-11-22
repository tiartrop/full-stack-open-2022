const Blog = require("../models/blog");
const User = require('../models/user')

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
};

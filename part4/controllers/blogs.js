const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  let { title, author, url, likes } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = request.user;

  if (!likes) {
    likes = 0;
  }

  if (!title || !url) {
    return response.status(400).json({
      error: "title or url is missing",
    });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  const saveBlog = await blog.save();
  user.blogs = user.blogs.concat(saveBlog._id);
  await user.save();

  response.status(201).json(saveBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response
      .status(401)
      .json({ error: "this blog has already been removed from server" });
  }

  if (user.id.toString() === blog.user.toString()) {
    Blog.findByIdAndRemove(request.params.id).then(() => {
      response.status(204).end();
    });
  } else {
    return response.status(401).json({ error: "token invalid" });
  }
});

blogsRouter.put("/:id", (request, response) => {
  const body = request.body;

  const person = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  }).then((updatedBlog) => {
    response.json(updatedBlog);
  });
});

module.exports = blogsRouter;

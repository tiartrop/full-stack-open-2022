const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/api/blogs", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

blogsRouter.post("/api/blogs", (req, res) => {
  const blog = new Blog(req.body);

  if (!blog.likes) {
    blog.likes = 0;
  }

  if (!blog.title || !blog.url) {
    return res.status(400).json({
      error: "title or url is missing",
    });
  }

  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

blogsRouter.delete("/api/blogs/:id", (req, res) => {
  Blog.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end();
  });
});

blogsRouter.put("/api/blogs/:id", (req, res) => {
  const body = req.body;

  const person = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  }).then((updatedBlog) => {
    res.json(updatedBlog);
  });
});

module.exports = blogsRouter;

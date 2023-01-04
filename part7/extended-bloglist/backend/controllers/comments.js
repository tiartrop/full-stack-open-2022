const commentsRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const Comment = require("../models/comment");

commentsRouter.get("/", async (request, response) => {
  const comments = await Comment.find({}).populate("user", { username: 1, name: 1 }).populate("comments", { content: 1 });

  response.json(comments);
});

commentsRouter.post("/", async (request, response) => {
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
      error: "title or url is missing"
    });
  }

  const comment = new Comment({
    title,
    author,
    url,
    likes,
    user: user._id
  });

  const saveComment = await comment.save();
  user.comments = user.comments ? user.comments.concat(saveComment._id) : [saveComment._id];
  await user.save();

  response.status(201).json(saveComment);
});

commentsRouter.put("/:id", (request, response) => {
  const { title, author, url, likes, user } = request.body;

  const person = {
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user
  };

  Comment.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query"
  }).then(updatedComment => {
    response.json(updatedComment);
  });
});

module.exports = commentsRouter;
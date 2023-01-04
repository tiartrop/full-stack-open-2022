const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const newTitle = process.argv[3];
const newAuthor = process.argv[4];
const newUrl = process.argv[5];
const newLikes = process.argv[6];

const url = `mongodb+srv://Ming:${password}@cluster0.m8x5hyi.mongodb.net/blogApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const blog = new Blog({
  title: newTitle,
  author: newAuthor,
  url: newUrl,
  likes: newLikes,
});

if (newTitle) {
  blog.save().then(() => {
    mongoose.connection.close();
  });
} else {
  Blog.find({}).then((result) => {
    result.forEach((blog) => {
      console.log(blog);
    });
    mongoose.connection.close();
  });
}

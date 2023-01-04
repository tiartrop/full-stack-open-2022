const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  return blogs.reduce((pre, cur) => pre + cur.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  const result = blogs.reduce((pre, cur) =>
    pre.likes > cur.likes ? pre : cur
  );
  delete result._id;
  delete result.url;
  delete result.__v;
  return result;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  let result = [];
  blogs.forEach((item) => {
    const a = result.find((i) => i.author === item.author);
    if (a) {
      a.blogs++;
    } else {
      result.push({ author: item.author, blogs: 1 });
    }
  });
  return result.reduce((pre, cur) => (pre.blogs > cur.blogs ? pre : cur));
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  let result = [];
  blogs.forEach((item) => {
    const a = result.find((i) => i.author === item.author);
    if (a) {
      a.likes += item.likes;
    } else {
      result.push({ author: item.author, likes: item.likes });
    }
  });
  return result.reduce((pre, cur) => (pre.likes > cur.likes ? pre : cur));
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

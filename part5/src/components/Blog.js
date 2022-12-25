import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [show, setShow] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const addLikes = () => {
    let { id, user, likes, author, title, url } = blog;
    likes += 1;
    updateLikes(
      {
        user: user.id,
        likes: likes,
        author: author,
        title: title,
        url: url,
      },
      id
    );
  };

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      <div id="blog-head">
        {blog.title} {blog.author}
        <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      </div>
      {show && (
        <div id="blog-content">
          <div>{blog.url}</div>
          <div>
            <span>like {blog.likes}</span>
            <button id="like-button" onClick={addLikes}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <button onClick={removeBlog}>remove</button>
        </div>
      )}
    </div>
  );
};

Blog.prototype = {
  blog: PropTypes.array.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
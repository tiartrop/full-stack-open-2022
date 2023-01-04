import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { deleteBlog, likeBlog, initializeBlogById } from "../reducers/blogReducer";

const BlogInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(initializeBlogById(id));
  }, [dispatch]);

  const blog = useSelector(({ blogs }) => blogs[0]);
  const user = useSelector(({ login }) => login);

  const addLikes = () => {
    dispatch(likeBlog(blog));
  };

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div id="blog-content">
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <span>like {blog.likes}</span>
      <button id="like-button" onClick={addLikes}>
        like
      </button>
      <div>added by {blog.user.name}</div>
      {user.name === blog.user.name && <button onClick={removeBlog}>remove</button>}
    </div>
  );
};

export default BlogInfo;

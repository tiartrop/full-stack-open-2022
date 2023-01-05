import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useField } from "../hooks.js";
import { initializeBlogById, deleteBlog, likeBlog, createComment } from "../reducers/blogReducer";

const BlogInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(initializeBlogById(id));
  }, [dispatch]);

  const blog = useSelector(({ blogs }) => blogs[0]);
  const user = useSelector(({ login }) => login);
  const { reset: resetComment, ...comment } = useField("text");

  const addLikes = () => {
    dispatch(likeBlog(blog));
  };

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
      navigate("/");
    }
  };

  const addComment = () => {
    dispatch(createComment(comment.value, id));
    resetComment();
  };

  if (!blog) {
    return null;
  }

  return (
    <div id="blog-content">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <span>like {blog.likes}</span>
      <button id="like-button" onClick={addLikes}>
        like
      </button>
      <div>added by {blog.user.name}</div>
      {user.name === blog.user.name && <button onClick={removeBlog}>remove</button>}
      <br />
      <h4>comments</h4>
      <input id="comment" name="Comment" {...comment} />
      <button id="comment-button" onClick={addComment}>
        add comment
      </button>
      {blog.comments && (
        <ul>
          {blog.comments.map((c, i) => (
            <li key={i}>{c.content}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogInfo;

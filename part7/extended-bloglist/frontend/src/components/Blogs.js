import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { initializeBlogs } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div className="blog" style={blogStyle}>
      <div id="blog-head">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  );
};

Blog.prototype = {
  blog: PropTypes.array.isRequired
};

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;

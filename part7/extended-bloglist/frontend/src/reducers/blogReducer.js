import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const sortByLikes = blogs => {
  blogs.sort((a, b) => b.likes - a.likes);
  return blogs;
};

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addLike(state, action) {
      const { id } = action.payload;
      return sortByLikes(state.map(blog => (blog.id !== id ? blog : action.payload)));
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      const id = action.payload;
      return sortByLikes(state.filter(blog => blog.id !== id));
    },
    setBlogs(state, action) {
      return sortByLikes(action.payload);
    }
  }
});

export const { addLike, appendBlog, removeBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const initializeBlogById = id => {
  return async dispatch => {
    const blog = await blogsService.getById(id);
    dispatch(setBlogs([blog]));
  };
};

export const createBlog = content => {
  return async dispatch => {
    try {
      const newBlog = await blogsService.create(content);
      dispatch(appendBlog(newBlog));
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, "success", 5));
    } catch (e) {
      dispatch(setNotification(e.response.data.error, "error", 5));
    }
  };
};

export const likeBlog = blog => {
  return async dispatch => {
    try {
      const changedBlog = await blogsService.update(
        {
          ...blog,
          user: blog.user.id,
          likes: blog.likes + 1
        },
        blog.id
      );
      dispatch(addLike(changedBlog));
    } catch (e) {
      dispatch(setNotification(e.response.data.error, "error", 5));
    }
  };
};

export const addComment = content => {
  return async dispatch => {
    try {
      await blogsService.addComment({
        content
      });
      dispatch(setNotification(`comment created`, "success", 5));
    } catch (e) {
      dispatch(setNotification(e.response.data.error, "error", 5));
    }
  };
};

export const deleteBlog = id => {
  return async dispatch => {
    try {
      await blogsService.del(id);
      dispatch(removeBlog(id));
      dispatch(setNotification(`blog removed`, "success", 5));
    } catch (e) {
      dispatch(setNotification(e.response.data.error, "error", 5));
    }
  };
};

export default blogSlice.reducer;
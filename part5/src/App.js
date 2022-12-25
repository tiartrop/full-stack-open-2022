import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ content: null, type: "" });

  const sortByLikes = () => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  };
  useEffect(sortByLikes, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showMessage = (content, type) => {
    setMessage({
      content: content,
      type: type,
    });
    setTimeout(() => setMessage({ content: null, type: "" }), 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      showMessage("welcome", "success");
    } catch (e) {
      showMessage(e.response.data.error, "error");
    }
  };

  const handelLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    showMessage(`${user.name} logged out`, "success");
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  );

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then((res) => {
        setBlogs(blogs.concat(res));
        showMessage(
          `a new blog ${res.title} by ${res.author} added`,
          "success"
        );
      })
      .catch((e) => {
        showMessage(e.response.data.error, "error");
      });
  };

  const addLikes = (blogObject, id) => {
    blogService
      .update(blogObject, id)
      .then(() => {
        sortByLikes();
      })
      .catch((e) => {
        showMessage(e.response.data.error, "error");
      });
  };

  const removeBlog = (id) => {
    blogService
      .del(id)
      .then(() => {
        showMessage(`blog removed`, "success");
        setBlogs(blogs.filter((b) => b.id !== id));
      })
      .catch((e) => {
        showMessage(e.response.data.error, "error");
      });
  };

  const blogFormRef = useRef();

  return (
    <div>
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <Notification message={message} />
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification message={message} />
          <span>{user.name} logged in</span>
          <button onClick={handelLogout}>logout</button>
          <br />
          <h2>create new</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={addLikes}
              deleteBlog={removeBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
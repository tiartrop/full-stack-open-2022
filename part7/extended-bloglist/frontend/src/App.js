import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import BlogInfo from "./components/BlogInfo";
import LoginInfo from "./components/LoginInfo";
import Users from "./components/Users";
import BlogsByUser from "./components/BlogsByUser";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { initializeLogin } from "./reducers/loginReducer";

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector(({ login }) => login);

  useEffect(() => {
    dispatch(initializeLogin());
  }, []);

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }


  return (
    <div>
      <LoginInfo />
      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h2>blog app</h2>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm togglableRef={blogFormRef} />
              </Togglable>
              <Blogs />
            </>
          }
        />
        <Route path="/users/:id" element={<BlogsByUser />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<BlogInfo />} />
      </Routes>
    </div>
  );
};

export default App;

import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import blogReducer from "../reducers/blogReducer";
import notificationReducer from "../reducers/notificationReducer";
import usersReducer from "../reducers/usersReducer";

const store = configureStore({
  reducer: {
    login: loginReducer,
    blogs: blogReducer,
    notification: notificationReducer,
    users: usersReducer
  }
});

export default store;
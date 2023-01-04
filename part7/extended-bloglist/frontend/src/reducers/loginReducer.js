import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout() {
      return null;
    }
  }
});

export const { login, logout } = loginSlice.actions;

export const initializeLogin = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  if (loggedUserJSON) {
    return async dispatch => {
      const user = JSON.parse(loggedUserJSON);
      blogsService.setToken(user.token);
      dispatch(login(user));
    };
  } else {
    return async dispatch => {
      dispatch(login(null));
    };
  }
};

export const userLogin = content => {
  return async dispatch => {
    try {
      const user = await loginService.login(content);
      blogsService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      dispatch(login(user));
    } catch (e) {
      dispatch(setNotification(e.response.data.error, "error", 5));
    }
  };
};

export const userLogout = user => {
  window.localStorage.removeItem("loggedBlogappUser");
  return async dispatch => {
    dispatch(setNotification(`${user.name} logged out`, "success", 5));
    dispatch(logout());
  };
};

export default loginSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    appendUser(state, action) {
      state.push(action.payload);
    },
    setUsers(state, action) {
      return action.payload;
    }
  }
});

export const { appendUser, setUsers } = blogSlice.actions;

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  };
};

export const initializeUserById = id => {
  return async dispatch => {
    const user = await usersService.getById(id);
    dispatch(setUsers([user]));
  };
};

export const createUser = content => {
  return async dispatch => {
    try {
      const newUser = await usersService.create(content);
      dispatch(appendUser(newUser));
      dispatch(setNotification(`a new blog ${newUser.name} created`, "success", 5));
    } catch (e) {
      dispatch(setNotification(e.response.data.error, "error", 5));
    }
  };
};

export default blogSlice.reducer;
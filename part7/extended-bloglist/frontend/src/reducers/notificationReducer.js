import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    }
  }
});

let timeout;

export const { createNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (content, type, time) => {
  return async dispatch => {
    clearTimeout(timeout);
    dispatch(createNotification({ content, type }));
    timeout = setTimeout(() => dispatch(clearNotification()), 1000 * time);
  };
};

export default notificationSlice.reducer;
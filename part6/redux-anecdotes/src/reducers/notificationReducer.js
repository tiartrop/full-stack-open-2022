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
    },
  },
});

export const { createNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(createNotification(content));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;

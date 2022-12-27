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

function debounce(func, ms=5000) {
  let timeout;
  return function () {
    console.log("timeout", timeout, func,arguments);
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}


export const { createNotification, clearNotification } = notificationSlice.actions;

const clear = debounce((dispatch) => dispatch(clearNotification()));

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(createNotification(content));
    clear(dispatch);
  };
};

export default notificationSlice.reducer;
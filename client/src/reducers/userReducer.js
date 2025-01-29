import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
    followUserRedux: (state, action) => {
      if (!state.user.following.includes(action.payload)) {
        state.user.following.push(action.payload);
      }
    },
    unfollowUserRedux: (state, action) => {
      state.user.following = state.user.following.filter((id) => id !== action.payload);
    },
  },
});

export const { login, logout, followUserRedux, unfollowUserRedux } = userSlice.actions;

export default userSlice.reducer;

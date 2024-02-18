import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinUser: (state, action) => {
      state.currentUser = action.payload;
    },
    signoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signinUser, signoutUser } = userSlice.actions;
export default userSlice.reducer;

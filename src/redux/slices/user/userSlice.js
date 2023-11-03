import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setAdminUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearAdminUser: (state) => {
      state.currentUser = null;
      toast.success("Logout successful");
    },
  },
});

export const { setAdminUser, clearAdminUser } = userSlice.actions;

export default userSlice.reducer;

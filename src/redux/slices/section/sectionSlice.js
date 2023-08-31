import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sections: [],
  sectionId:"",
  isLoading: false,
};

const sectionSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    setSection: (state, action) => {
      // console.log(action.payload);
      state.sections = action.payload;
    },
    setSectionId: (state, action) =>{
      console.log(action.payload);
      state.sectionId = action.payload;
    }
  },
});

export const { setSection, setSectionId } = sectionSlice.actions

export default sectionSlice.reducer;

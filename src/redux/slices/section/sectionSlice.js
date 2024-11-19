import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  sections: [],
  sectionId: "",
  isLoading: false,
};

export const getSections = createAsyncThunk(
  "sections/getSections",
  async () => {
    try {
      const res = await fetch(`${process.env.LOCAL_SERVER}/sections`);
      const { data } = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const sectionSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    setSection: (state, action) => {
      console.log(action.payload);
      state.sections = action.payload;
    },
    setSectionId: (state, action) => {
      state.sectionId = action.payload;
    },
    createdSection: (state, action) => {
      state.sections.push(action.payload);
    },
    deletedSection: (state, action) => {
      state.sections = state.sections.filter(
        (section) => section._id !== action.payload
      );
    },
  },
  extraReducers: {
    [getSections.pending]: (state) => {
      state.isLoading = true;
    },
    [getSections.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.sections = action.payload;
    },
    [getSections.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setSection, setSectionId, createdSection, deletedSection } =
  sectionSlice.actions;

export default sectionSlice.reducer;

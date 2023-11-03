import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = `${process.env.REACT_APP_SERVER_HOST}/category`;

const initialState = {
  categories: [],
  categoryId: "",
  isLoading: true,
};

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async () => {
    return (await fetch(url)).json();
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      console.log(action.payload);
      state.categories = action.payload;
    },
    setCategoryId: (state, action) => {
      // console.log(action.payload);
      state.categoryId = action.payload;
    },
    createdCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    deletedCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
    },
  },
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.data;
    },
    [getCategories.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setCategory, setCategoryId, createdCategory, deletedCategory } =
  categorySlice.actions;

export const getAllCategories = (state) => state.category.categories;

export default categorySlice.reducer;

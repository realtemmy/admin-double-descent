import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log(action.payload);
      state.products = action.payload;
    },
  },
  // extraReducers
});

export const { setProducts } = productSlice.actions 

export default productSlice.reducer;

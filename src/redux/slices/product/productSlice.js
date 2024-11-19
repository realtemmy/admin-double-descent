import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  productId: "",
};

export const getProducts = createAsyncThunk(
  "products/getproducts",
  async () => {
    try {
      const res = await fetch(`${process.env.LOCAL_SERVER}/products`);
      const { data } = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log(action.payload);
      state.products = action.payload;
    },
    setProductId: (state, action) => {
      // console.log(action.payload);
      state.productId = action.payload;
    },
    createdProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deletedProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [getProducts.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setProducts, setProductId, createdProduct, deletedProduct } =
  productSlice.actions;

export default productSlice.reducer;

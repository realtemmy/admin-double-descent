import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  orderCount: 0,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    updateOrder: (state, action) => {
      // find the order and update
      const orderIndex = state.orders.findIndex(
        (order) => order._id === action.payload._id
      );
      state.orders[orderIndex] = action.payload;
    },
    orderCount: (state) => {
      state.orderCount = state.orders.length;
    },
  },
});

export const { updateOrder, orderCount } = orderSlice.actions;

export default orderSlice.reducer;

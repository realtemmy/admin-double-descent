import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/category/categorySlice";
import sectionReducer from "./slices/section/sectionSlice";
import productReducer from "./slices/product/productSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  category: categoryReducer,
  section: sectionReducer,
  product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

// console.log(store.getState());

export const persistor = persistStore(store);

export default store;

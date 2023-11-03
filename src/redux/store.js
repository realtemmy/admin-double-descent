import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import categoryReducer from "./slices/category/categorySlice";
import sectionReducer from "./slices/section/sectionSlice";
import productReducer from "./slices/product/productSlice";
import userReducer from "./slices/user/userSlice";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  category: categoryReducer,
  section: sectionReducer,
  product: productReducer,
  admin: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

// console.log(store.getState());

export const persistor = persistStore(store);

export default store;

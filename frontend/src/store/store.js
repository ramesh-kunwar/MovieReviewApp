import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import authSliceReducer from "./authSlice";
// import { apiSlice } from "./src/slices/apiSlice";
// import cartSliceReducer from "./src/slices/cartSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer
    // cart: cartSliceReducer,
    // auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

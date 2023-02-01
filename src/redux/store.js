import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    users: usersReducer,
  },
});

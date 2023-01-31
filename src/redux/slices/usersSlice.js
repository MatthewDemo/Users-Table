import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
    "pizza/fetchUsersStatus",
    async () => {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/users`
        );
        return res.data;
      }
  );

const initialState = {
  users: [],
  status: "loading", // loading | success| error
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
  
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.status = "success";
    },
    [fetchUsers.pending]: (state) => {
      state.status = "loading";
      state.users = [];
    },
    [fetchUsers.rejected]: (state) => {
      state.status = "error";
      state.users = [];
    },
  },
});

export const {  } = usersSlice.actions;

export default usersSlice.reducer;

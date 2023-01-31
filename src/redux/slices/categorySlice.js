import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalActive: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setModalActive: (state, action) => {
      state.modalActive = action.payload;
    },
  },
});

export const { setModalActive } = categorySlice.actions;

export default categorySlice.reducer;

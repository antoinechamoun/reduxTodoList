import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    hideModal: (state) => {
      state.isOpen = false;
    },
    showModal: (state) => {
      state.isOpen = true;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;

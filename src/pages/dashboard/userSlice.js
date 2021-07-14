import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoading: false,
  error: "",
  successMsg: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserPending: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.error = "";
    },
    getUserFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    AddUserPending: (state) => {
      state.isLoading = true;
    },
    AddUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.error = "";
    },
    AddUserFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    restSuccessMSg: (state) => {
      state.isLoading = true;
      state.successMsg = "Utilisateur Ajouter avec success";
    },
  },
});

export const {
  getUserPending,
  getUserSuccess,
  getUserFail,
  AddUserFail,
  AddUserPending,
  AddUserSuccess,
  restSuccessMSg,
} = userSlice.actions;

export default userSlice.reducer;

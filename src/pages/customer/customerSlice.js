import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  isLoading: false,
  error: "",
  searchCustomerList: [],
  selectedCustomer: {},
  replyMsg: "",
};

const customerListSlice = createSlice({
  name: "customerList",
  initialState,
  reducers: {
    fetchCustomerLoading: (state, action) => {
      state.isLoading = true;
    },
    fetchCustomerSuccess: (state, action) => {
      state.customers = action.payload;
      state.searchCustomerList = action.payload;
      state.isLoading = false;
    },
    fetchCustomerFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    searchCustomers: (state, { payload }) => {
      state.searchCustomerList = state.customers.filter((row) => {
        if (!payload) return row;
        return row.name.toLowerCase().includes(payload.toLowerCase());
      });
    },
    fetchSingleCustomerLoading: (state) => {
      state.isLoading = true;
    },
    fetchSingleCustomerSuccess: (state, { payload }) => {
      state.selectedCustomer = payload;
      state.isLoading = false;
      state.error = "";
    },
    fetchSingleCustomerFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const { reducer, actions } = customerListSlice;

export const {
  fetchCustomerLoading,
  fetchCustomerSuccess,
  fetchCustomerFail,
  searchCustomers,
  fetchSingleCustomerFail,
  fetchSingleCustomerSuccess,
  fetchSingleCustomerLoading,
} = actions;

export default reducer;

import axios from "axios";

import {
  fetchCustomerLoading,
  fetchCustomerSuccess,
  fetchCustomerFail,
  searchCustomers,
} from "./customerSlice";

import { getAllUsers } from "../../api/userApi";
export const fetchAllCustomers = () => async (dispatch) => {
  dispatch(fetchCustomerLoading());

  try {
    const result = await getAllUsers();
    dispatch(fetchCustomerSuccess(result.data.result));
    if (!result.data.result) {
      dispatch(fetchCustomerFail({ message: "error couldn't load" }));
    }
    console.log(result);
  } catch (error) {
    dispatch(fetchCustomerFail(error.message));
  }
};

export const filterSearchCustomers = (str) => (dispatch) => {
  dispatch(searchCustomers(str));
};

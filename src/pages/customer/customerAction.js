import axios from "axios";

import {
  fetchCustomerLoading,
  fetchCustomerSuccess,
  fetchCustomerFail,
  searchCustomers,
  fetchSingleCustomerLoading,
  fetchSingleCustomerSuccess,
  fetchSingleCustomerFail,
} from "./customerSlice";

import { getAllUsers, getUserbyID } from "../../api/userApi";
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
export const fetchCustomerByID = (_id) => async (dispatch) => {
  dispatch(fetchSingleCustomerLoading());

  try {
    const result = await getUserbyID(_id);
    console.log(result);
    dispatch(fetchSingleCustomerSuccess(result.data.result));
    if (!result.data.result) {
      dispatch(fetchSingleCustomerFail({ message: "error couldn't load" }));
    }
    console.log(result);
  } catch (error) {
    dispatch(fetchSingleCustomerFail(error.message));
  }
};

export const filterSearchCustomers = (str) => (dispatch) => {
  dispatch(searchCustomers(str));
};

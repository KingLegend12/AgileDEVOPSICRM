import {
  registrationPending,
  registrationSuccess,
  registrationError,
} from "./userRegistrationSlice";

import { userRegistration, AdminRegistration } from "../../api/userApi";

export const newUserRegistration = (frmDt) => async (dispatch) => {
  try {
    dispatch(registrationPending());

    const result = await userRegistration(frmDt);
    result.status === "success"
      ? dispatch(registrationSuccess(result.message))
      : dispatch(registrationError(result.message));

    console.log(result);
  } catch (error) {
    dispatch(registrationError(error.message));
  }
};

export const newAdminRegistration = (frmDt) => async (dispatch) => {
  try {
    dispatch(registrationPending());

    const result = await AdminRegistration(frmDt);
    result.status === "success"
      ? dispatch(registrationSuccess(result.message))
      : dispatch(registrationError(result.message));

    console.log(result);
  } catch (error) {
    dispatch(registrationError(error.message));
  }
};

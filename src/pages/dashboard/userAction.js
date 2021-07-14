import {
  getUserPending,
  getUserSuccess,
  getUserFail,
  AddUserFail,
  AddUserPending,
  AddUserSuccess,
} from "./userSlice";
import { fetchUser, userRegistration } from "../../api/userApi";

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch(getUserPending());

    const result = await fetchUser();

    if (result.admin && result.admin._id)
      return dispatch(getUserSuccess(result.admin));

    dispatch(getUserFail("User is not found"));
  } catch (error) {
    dispatch(getUserFail(error));
  }
};

export const addNewClient = (frmData) => async (dispatch) => {
  try {
    dispatch(AddUserPending());

    const result = await userRegistration(frmData);

    return dispatch(AddUserSuccess("Utilisateur Ajouté avec success"));

    return dispatch(AddUserFail("User is not found"));
  } catch (error) {
    return dispatch(AddUserFail(error));
  }
};

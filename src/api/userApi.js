import axios from "axios";

const rootUrl = "https://devagileicrm.herokuapp.com/v1/";
const ClientRootUrl = "https://devagileicrm.herokuapp.com/v1/user";
const AdminRootUrl = "https://devagileicrm.herokuapp.com/v1/admin";
const loginUrl = rootUrl + "admin/login";
const userProfileUrl = rootUrl + "admin";
const userAddingProfileUrl = ClientRootUrl + "/UserAddedFromAdmin";
const logoutUrl = rootUrl + "admin/logout";
const newAccessJWT = rootUrl + "tokens";
const userVerificationUrl = userProfileUrl + "/verify";

export const userRegistration = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(userAddingProfileUrl, frmData);

      resolve(res.data);

      if (res.data.status === "success") {
        resolve(res.data);
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const AdminRegistration = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(AdminRootUrl, frmData);

      resolve(res.data);

      if (res.data.status === "success") {
        resolve(res.data);
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const userRegistrationVerification = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.patch(userVerificationUrl, frmData);

      resolve(res.data);
      if (res.data.status === "success") {
        resolve(res.data);
      }
    } catch (error) {
      reject({ status: "error", message: error.error });
    }
  });
};

export const userLogin = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(loginUrl, frmData);

      resolve(res.data);

      if (res.data.status === "success") {
        sessionStorage.setItem("accessJWT", res.data.accessJWT);
        localStorage.setItem(
          "crmSite",
          JSON.stringify({ refreshJWT: res.data.refreshJWT })
        );
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(
        "https://devagileicrm.herokuapp.com/v1/admin/allUsers",
        {
          headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
          },
        }
      );

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getUserbyID = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(
        "https://devagileicrm.herokuapp.com/v1/admin/client/" + _id,
        {
          headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
          },
        }
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");

      if (!accessJWT) {
        reject("Token not found!");
      }

      const res = await axios.get(userProfileUrl, {
        headers: {
          Authorization: accessJWT,
        },
      });

      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error.message);
    }
  });
};

export const fetchNewAccessJWT = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { refreshJWT } = JSON.parse(localStorage.getItem("crmSite"));

      if (!refreshJWT) {
        reject("Token not found!");
      }

      const res = await axios.get(newAccessJWT, {
        headers: {
          Authorization: refreshJWT,
        },
      });

      if (res.data.status === "success") {
        sessionStorage.setItem("accessJWT", res.data.accessJWT);
      }

      resolve(true);
    } catch (error) {
      if (error.message === "Request failed with status code 403") {
        localStorage.removeItem("crmSite");
      }

      reject(false);
    }
  });
};

export const userLogout = async () => {
  try {
    await axios.delete(logoutUrl, {
      headers: {
        Authorization: sessionStorage.getItem("accessJWT"),
      },
    });
  } catch (error) {
    console.log(error);
  }
};

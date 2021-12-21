import axios from "axios";

const rootUrl = "https://devagileicrm.herokuapp.com/v1/";
const ticketUlr = rootUrl + "ticket/";
const updateTicketUrl = rootUrl + "ticket/treat-ticket/";
const closeTicketUrl = rootUrl + "ticket/admin_FinalClose-ticket/";

const updateClosureTicketUrl = rootUrl + "ticket/admin_close-ticket/";
export const getAllTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(
        "https://devagileicrm.herokuapp.com/v1/ticket/AllTickets",
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
export const getLowPriorityTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(
        "https://devagileicrm.herokuapp.com/v1/ticket/basse",
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
export const getMedPriorityTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(
        "https://devagileicrm.herokuapp.com/v1/ticket/moyenne",
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
export const getHighPriorityTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(
        "https://devagileicrm.herokuapp.com/v1/ticket/elevee",
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
export const getSingleTicket = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(
        "https://devagileicrm.herokuapp.com/v1/ticket/admin/" + _id,
        {
          headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
          },
        }
      );

      resolve(result);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const updateReplyTicket = (_id, msgObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.put(
        "https://devagileicrm.herokuapp.com/v1/ticket/admin/" + _id,
        msgObj,
        {
          headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
          },
        }
      );

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const updateTicketStatusClosed = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(
        updateTicketUrl + _id,
        {},
        {
          headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
          },
        }
      );

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};
export const updateTicketStatusFinalClose = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(
        closeTicketUrl + _id,
        {},
        {
          headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
          },
        }
      );

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const updateTicketStatusClosure = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(
        updateClosureTicketUrl + _id,
        {},
        {
          headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
          },
        }
      );

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const createNewTicket = (frmData) => {
  console.log("FROM THE API", frmData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(ticketUlr, frmData, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

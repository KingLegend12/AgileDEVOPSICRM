import axios from "axios";

const rootUrl = "http://localhost:3001/v1/";
const ticketUlr = rootUrl + "ticket/";
const closeTicketUrl = rootUrl + "ticket/close-ticket/";

export const getLowPriorityTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("http://localhost:3001/v1/ticket/basse", {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

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
        "http://localhost:3001/v1/ticket/moyenne",
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
      const result = await axios.get("http://localhost:3001/v1/ticket/elevee", {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
export const getSingleTicket = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(ticketUlr + "admin/" + _id, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

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
      const result = await axios.put(ticketUlr + "admin/" + _id, msgObj, {
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

export const updateTicketStatusClosed = (_id) => {
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

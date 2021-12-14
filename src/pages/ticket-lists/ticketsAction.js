import axios from "axios";

import {
  fetchTicketLoading,
  fetchTicketSuccess,
  fetchTicketFail,
  searchTickets,
  fetchSingleTicketLoading,
  fetchSingleTicketSuccess,
  fetchSingleTicketFail,
  replyTicketLoading,
  replyTicketSuccess,
  replyTicketFail,
  closeTicketLoading,
  closeTicketSuccess,
  closeTicketFail,
  searchTicketsByPriority,
} from "./ticketSlice";

import {
  getLowPriorityTickets,
  getSingleTicket,
  updateReplyTicket,
  updateTicketStatusClosed,
  updateTicketStatusClosure,
  getHighPriorityTickets,
  getMedPriorityTickets,
  getAllTickets,
  updateTicketStatusFinalClose,
} from "../../api/ticketApi";
export const fetchAllTheTickets = () => async (dispatch) => {
  dispatch(fetchTicketLoading());

  try {
    const result = await getAllTickets();
    dispatch(fetchTicketSuccess(result.data.result));
    if (!result.data.result) {
      dispatch(fetchTicketFail({ message: "error couldn't load" }));
    }
    console.log(result);
  } catch (error) {
    dispatch(fetchTicketFail(error.message));
  }
};
export const fetchAllTickets = () => async (dispatch) => {
  dispatch(fetchTicketLoading());

  try {
    const result = await getLowPriorityTickets();
    dispatch(fetchTicketSuccess(result.data.result));
    if (!result.data.result) {
      dispatch(fetchTicketFail({ message: "error couldn't load" }));
    }
    console.log(result);
  } catch (error) {
    dispatch(fetchTicketFail(error.message));
  }
};
export const fetchMedPrioTicketsTickets = () => async (dispatch) => {
  dispatch(fetchTicketLoading());

  try {
    const result = await getMedPriorityTickets();
    dispatch(fetchTicketSuccess(result.data.result));
    if (!result.data.result) {
      dispatch(fetchTicketFail({ message: "error couldn't load" }));
    }
    console.log(result);
  } catch (error) {
    dispatch(fetchTicketFail(error.message));
  }
};

export const fetchHighPrioTicketsTickets = () => async (dispatch) => {
  dispatch(fetchTicketLoading());

  try {
    const result = await getHighPriorityTickets();
    dispatch(fetchTicketSuccess(result.data.result));
    if (!result.data.result) {
      dispatch(fetchTicketFail({ message: "error couldn't load" }));
    }
    console.log(result);
  } catch (error) {
    dispatch(fetchTicketFail(error.message));
  }
};
export const filterSearchTicket = (str) => (dispatch) => {
  dispatch(searchTickets(str));
};

export const filterSearchTicketsByPrioroty = (str) => (dispatch) => {
  dispatch(searchTicketsByPriority(str));
};

export const fetchSingleTicket = (_id) => async (dispatch) => {
  dispatch(fetchSingleTicketLoading());
  try {
    const result = await getSingleTicket(_id);
    dispatch(
      fetchSingleTicketSuccess(
        result.data.result.length && result.data.result[0]
      )
    );
  } catch (error) {
    dispatch(fetchSingleTicketFail(error.message));
  }
};

export const replyOnTicket = (_id, msgObj) => async (dispatch) => {
  dispatch(replyTicketLoading());
  try {
    const result = await updateReplyTicket(_id, msgObj);
    console.log(result);
    if (result.status === "error") {
      return dispatch(replyTicketFail(result.message));
    }

    dispatch(fetchSingleTicket(_id));

    dispatch(replyTicketSuccess("Message envoyée avec succes"));
  } catch (error) {
    console.log(error.message);
    dispatch(replyTicketFail(error.message));
  }
};

export const closeTicket = (_id) => async (dispatch) => {
  dispatch(closeTicketLoading());
  try {
    const result = await updateTicketStatusClosed(_id);
    if (result.status === "error") {
      return dispatch(closeTicketFail(result.message));
    }

    dispatch(fetchSingleTicket(_id));

    dispatch(closeTicketSuccess("Ce ticket est en traitement"));
  } catch (error) {
    console.log(error.message);
    dispatch(closeTicketFail(error.message));
  }
};
export const FinalcloseTicket = (_id) => async (dispatch) => {
  dispatch(closeTicketLoading());
  try {
    const result = await updateTicketStatusFinalClose(_id);
    if (result.status === "error") {
      return dispatch(closeTicketFail(result.message));
    }

    dispatch(fetchSingleTicket(_id));

    dispatch(closeTicketSuccess("Ce ticket est fermé"));
  } catch (error) {
    console.log(error.message);
    dispatch(closeTicketFail(error.message));
  }
};

export const closureTicket = (_id) => async (dispatch) => {
  dispatch(closeTicketLoading());
  try {
    const result = await updateTicketStatusClosure(_id);
    if (result.status === "error") {
      return dispatch(closeTicketFail(result.message));
    }

    dispatch(fetchSingleTicket(_id));

    dispatch(closeTicketSuccess("Ce ticket est en fermeture"));
  } catch (error) {
    console.log(error.message);
    dispatch(closeTicketFail(error.message));
  }
};

import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./pages/ticket-lists/ticketSlice";
import loginReducer from "./components/login/Login.Slice";
import userReducer from "./pages/dashboard/userSlice";
import newTicketReducer from "./components/add-ticket-from/add-ticketSlicer";
import registrationReducer from "./components/registration-form/userRegistrationSlice";
import customersReducer from "./pages/customer/customerSlice";
const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    login: loginReducer,
    user: userReducer,
    customers: customersReducer,
    openTicket: newTicketReducer,
    registration: registrationReducer,
  },
});

export default store;

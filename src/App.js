import "./App.css";
import { Button } from "react-bootstrap";
import Entry from "./pages/entry/Entry.page";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Dashboard } from "./pages/dashboard/Dashboard.page";
import { AddTicketPage } from "./components/new-ticket/Addticketpage";
import { TicketLists } from "./pages/ticket-lists/TicketLists.page";
import { MPTicketLists } from "./pages/ticket-lists/MedPrioTicketsLists.page";
import { HPTicketLists } from "./pages/ticket-lists/HighPriorityTicketsLists.page";
import { Ticket } from "./pages/ticket/Ticket.page";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PrivateRoute } from "./components/private-route/PrivateRoute.comp";
import { Registration } from "./pages/registration/Registration.page";
import { UserVerification } from "./pages/verification/UserVerification.page";
import { CustomerLists } from "./pages/customer/customerList";
import UpdatePasswordForm from "./password-reset/UpdatePasswordForm.comp";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Entry />
          </Route>
          <Route exact path="/resetpasswordform">
            <UpdatePasswordForm />
          </Route>
          <Route exact path="/registration">
            <Registration />
          </Route>
          <Route exact path="/verification/:_id/:email">
            <UserVerification />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/Allclients">
            <CustomerLists />
          </PrivateRoute>
          <PrivateRoute path="/add-ticket">
            <AddTicketPage />
          </PrivateRoute>
          <PrivateRoute path="/P-Btickets">
            <TicketLists />
          </PrivateRoute>
          <PrivateRoute path="/P-Mtickets">
            <MPTicketLists />
          </PrivateRoute>
          <PrivateRoute path="/P-Etickets">
            <HPTicketLists />
          </PrivateRoute>
          <Route path="/ticket/:tId">
            <Ticket />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

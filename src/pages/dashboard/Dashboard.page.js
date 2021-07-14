import React, { useEffect, useState } from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTheTickets } from "../../pages/ticket-lists/ticketsAction";
import { TicketTable } from "../../components/Ticket-table/TicketTable.comp";
//import tickets from "../../assets/data/dummy-tickets.json";
import "./DashboardStyling.css";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { Link } from "react-router-dom";
export const Dashboard = () => {
  const dispatch = useDispatch();
  const refreshPage = () => {
    window.location.reload();
  };
  const [str, setStr] = useState("");
  useEffect(() => {
    dispatch(fetchAllTheTickets());
  }, [str, dispatch]);
  const { tickets } = useSelector((state) => state.tickets);
  const pendingtickets = tickets.filter((row) => row.status !== "Fermer");
  const totaltickets = tickets.length;
  return (
    <Container>
      <hr />

      <Row>
        <Col>
          <PageBreadcrumb page="Dashboard" />
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-5 mb-2">
          <Link to="/add-ticket">
            <Button
              className="HeaderBTN"
              variant="success"
              style={{
                "font-size": "2rem",
                "border-radius": "2rem",
              }}
            >
              Ajouter un client
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className="text-center mb-2">
          <div>
            <h2>Total des tickets: {totaltickets}</h2>
          </div>
          <div>
            <h2>Mes tickets en attente: {pendingtickets.length}</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          className="text-center mb-2"
          style={{
            "font-size": "1.5rem",
          }}
        >
          Ticket Ajouté recently
        </Col>
      </Row>
      <hr />
      <Row>
        <Col className="recent-ticket">
          <TicketTable />
        </Col>
      </Row>
    </Container>
  );
};

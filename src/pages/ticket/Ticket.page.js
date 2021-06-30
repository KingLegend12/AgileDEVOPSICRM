import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import tickets from "../../assets/data/dummy-tickets.json";
import { MessageHistory } from "../../components/message-history/MessageHistory.comp";
import { UpdateTicket } from "../../components/update-ticket/UpdateTicket.comp";
import { useParams } from "react-router-dom";
//const ticket = tickets[0];
export const Ticket = () => {
  const { tId } = useParams();
  const [message, setMessage] = useState("");
  const [ticket, setTicket] = useState("");

  useEffect(() => {
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].id == tId) {
        setTicket(tickets[i]);
        continue; //break the loop
      }
    }
  }, [message]);
  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };
  const handleOnSubmit = () => {
    alert("submiitted");
  };
  return (
    <Container>
      <hr />
      <Row>
        <Col>
          <PageBreadcrumb page="Ticket" />
        </Col>
      </Row>
      <Row>
        {tId}
        <Col>
          <div className="subject">Sujet: {ticket.subject}</div>
          <div className="date">Date de reclammation: {ticket.addedAt}</div>
          <div className="status">Status: {ticket.status}</div>
          <div className="priority">Priorite {ticket.priority}</div>
        </Col>
        <Col className="text-right">
          <Button variant="outline-info">Fermer le ticket</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>{ticket.history && <MessageHistory msg={ticket.history} />}</Col>
      </Row>
      <hr style={{ backgroundColor: "orange" }} />
      <Row className="mt-4">
        <Col>
          <UpdateTicket
            msg={message}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
          />
        </Col>
      </Row>
    </Container>
  );
};
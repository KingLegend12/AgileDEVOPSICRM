import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import tickets from "../../assets/data/dummy-tickets.json";
import { MessageHistory } from "../../components/message-history/MessageHistory.comp";
import { UpdateTicket } from "../../components/update-ticket/UpdateTicket.comp";
import { useParams } from "react-router-dom";
import {
  fetchSingleTicket,
  closeTicket,
  closureTicket,
  FinalcloseTicket,
} from "../ticket-lists/ticketsAction";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../pages/dashboard/userAction";
import { Header } from "../../layout/partial/Header.comp";
import { resetResponseMsg } from "../ticket-lists/ticketSlice";
//const ticket = tickets[0];
export const Ticket = () => {
  const { tId } = useParams();
  const [message, setMessage] = useState("");
  const [ticket, setTicket] = useState("");
  const {
    isLoading,
    error,
    selectedTicket,
    replyMsg,
    replyTicketError,
  } = useSelector((state) => state.tickets);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleTicket(tId));
    dispatch(getUserProfile());

    return () => {
      (replyMsg || replyTicketError) && dispatch(resetResponseMsg());
    };
  }, [message, tId, dispatch, replyMsg, replyTicketError]);
  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };
  const handleOnSubmit = () => {
    alert("submiitted");
  };
  return (
    <>
      {" "}
      <Header />
      <Container>
        <hr />
        <Row>
          <Col>
            <PageBreadcrumb page="Ticket" />
          </Col>
        </Row>
        <Row>
          <Col>
            {isLoading && <Spinner variant="primary" animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {replyTicketError && (
              <Alert variant="danger">{replyTicketError}</Alert>
            )}
            {replyMsg &&
              user.etape == "En attente de la reponse de l'operateur" && (
                <Alert variant="success">
                  Ce ticket est en cours de Traitement
                </Alert>
              )}
            {replyMsg && user.etape == "Traitement" && (
              <Alert variant="success">Ce ticket est en Traitement</Alert>
            )}
            {replyMsg && user.etape == "Fermeture" && (
              <Alert variant="success">Ce ticket est ferm??</Alert>
            )}
          </Col>
        </Row>
        <Row>
          Identifiant : {tId}
          <Col
            style={{
              backgroundColor: "orange",
              borderRadius: "2rem",
              opacity: "0.8",
              boxShadow: "0px 0px 9px cyan",
            }}
          >
            <div className="subject">Sujet: {selectedTicket.subject}</div>
            <div className="date">
              Date de reclammation:{" "}
              {selectedTicket.openAt &&
                new Date(selectedTicket.openAt).toLocaleString()}
            </div>
            <div className="status">Status: {selectedTicket.status}</div>
            <div className="priority">Priorite: {selectedTicket.priority}</div>
          </Col>
          <Col className="text-right">
            {selectedTicket.status ==
              "En attente de la reponse de l'operateur" &&
              user.etape == "En attente de la reponse de l'operateur" && (
                <Button
                  variant="outline-info"
                  onClick={() => dispatch(closeTicket(tId))}
                  disabled={selectedTicket.status === "Traitement"}
                >
                  Commencer la resolution
                </Button>
              )}{" "}
            {selectedTicket.status == "Traitement" &&
              user.etape == "Traitement" && (
                <Button
                  variant="outline-info"
                  onClick={() => dispatch(closureTicket(tId))}
                  disabled={selectedTicket.status === "Fermeture"}
                >
                  Fermer le ticket
                </Button>
              )}
            {selectedTicket.status == "Fermeture" && user.etape == "Fermeture" && (
              <Button
                variant="outline-info"
                onClick={() => dispatch(FinalcloseTicket(tId))}
                disabled={selectedTicket.status === "Fermer"}
              >
                Fermer le ticket
              </Button>
            )}
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            {selectedTicket.conversations && (
              <MessageHistory msg={selectedTicket.conversations} />
            )}
          </Col>
        </Row>
        <hr style={{ backgroundColor: "orange" }} />
        <Row className="mt-4">
          <Col>
            <UpdateTicket _id={tId} />
          </Col>
        </Row>
      </Container>{" "}
    </>
  );
};

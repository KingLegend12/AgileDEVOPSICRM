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
import { fetchCustomerByID } from "../customer/customerAction";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../pages/dashboard/userAction";
import { Header } from "../../layout/partial/Header.comp";
//const ticket = tickets[0];
export const Customer = () => {
  const { cId } = useParams();
  const [message, setMessage] = useState("");
  const [ticket, setTicket] = useState("");
  const { isLoading, error, selectedCustomer } = useSelector(
    (state) => state.customers
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomerByID(cId));
  }, [cId, dispatch]);
  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };
  const handleOnSubmit = () => {
    alert("submitted");
  };
  return (
    <>
      {" "}
      <Container>
        <hr />
        <Row>
          <Col>
            <PageBreadcrumb page="Client" />
          </Col>
        </Row>
        <Row>
          <Col>
            {isLoading && <Spinner variant="primary" animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
          </Col>
        </Row>
        <Row
          className="bg-transparent"
          style={{
            fontSize: "40px",
            color: "black",
            backgroundColor: "transparent",
            borderRadius: "2rem",
            boxShadow: "10px 11px 200px cyan",
            paddingBottom: "50px",
            paddingTop: "50px",
            textAlign: "center",
          }}
        >
          <Col>
            {" "}
            <h2
              style={{
                boxShadow: "1px 3px 10px black",
                textAlign: "center",
              }}
            >
              Identifiant :
            </h2>{" "}
            <h1>{cId}</h1>{" "}
          </Col>
          <Col>
            <div className="name">
              {" "}
              <h2
                style={{
                  boxShadow: "1px 3px 10px black",
                  textAlign: "center",
                }}
              >
                Name:
              </h2>{" "}
              <h1>{selectedCustomer.name}</h1>{" "}
            </div>

            <div className="email">
              {" "}
              <h2
                style={{
                  boxShadow: "1px 3px 10px black",
                  textAlign: "center",
                }}
              >
                Email:
              </h2>{" "}
              <h1>{selectedCustomer.email}</h1>{" "}
            </div>
          </Col>
          <Col className="text-right">
            {/*<Button
              variant="outline-info"
              onClick={() => dispatch(closeAccount(cId))}
            >
              Supprimer le compte
            </Button> */}
          </Col>
        </Row>
      </Container>{" "}
    </>
  );
};

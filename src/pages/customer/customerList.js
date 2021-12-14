import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllCustomers } from "./customerAction";
import { Container, Row, Col, Button } from "react-bootstrap";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { SearchClientForm } from "../../components/search-form/DearchcustomerForm";
import { CustomerTable } from "../../components/clients_table/client_table.comp";
import { Link } from "react-router-dom";
import { fetchAllTickets } from "../ticket-lists/ticketsAction";
export const CustomerLists = () => {
  const dispatch = useDispatch();
  const [str, setStr] = useState("");

  useEffect(() => {
    dispatch(fetchAllCustomers());
    dispatch(fetchAllTickets);
  }, [str, dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          <hr />
          <PageBreadcrumb page="Client Lists" />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Link to="/add-ticket">
            <Button variant="info">Ajouter un nouveau client</Button>
          </Link>
        </Col>

        <Col className="text-right">
          <SearchClientForm />
        </Col>
      </Row>

      <hr />
      <Row>
        <Col>
          <CustomerTable />
        </Col>
      </Row>
    </Container>
  );
};

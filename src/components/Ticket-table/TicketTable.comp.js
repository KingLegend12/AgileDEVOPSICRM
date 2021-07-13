import React from "react";
import { BoxLoading, WindMillLoading } from "react-loadingg";
import { Table, Container, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export const TicketTable = () => {
  const { searchTicketList, isLoading, error } = useSelector(
    (state) => state.tickets
  );
  if (isLoading)
    return (
      <div>
        <WindMillLoading />
        <h3
          style={{
            "text-align": "center",
            "margin-top": "150px",
            color: "cyan",
          }}
        >
          Loading...
        </h3>
      </div>
    );

  if (error) return <h3>{error}</h3>;

  return (
    <>
      <Container>
        <Table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>Identifiant du ticket</th>
              <th>Sujet</th>
              <th>Status</th>
              <th>Priorité</th>
              <th>Date d'ouverture</th>
            </tr>
          </thead>
          <tbody>
            {searchTicketList.length ? (
              searchTicketList.map((row) => (
                <tr>
                  <td>{row._id}</td>
                  <td>
                    <Link to={`/ticket/${row._id}`}>{row.subject}</Link>
                  </td>
                  <td>{row.status}</td>
                  <td
                    style={{
                      backgroundColor:
                        row.priority == "Elevée"
                          ? "red"
                          : row.priority == "Moyenne"
                          ? "orange"
                          : "green",
                    }}
                  >
                    {row.priority}
                  </td>
                  <td>{row.openAt && new Date(row.openAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Vous n'avez auncun ticket de reclamation en cours{""}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

import React from "react";
import { BoxLoading, WindMillLoading } from "react-loadingg";
import { Table, Container, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
export const TicketTable = () => {
  const { searchTicketList, isLoading, error } = useSelector(
    (state) => state.tickets
  );
  const data = searchTicketList;
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
  const columns = [
    {
      dataField: "_id",
      text: "Identifiant du ticket",
    },
    {
      dataField: "subject",
      text: "Sujet",
      formatter: (cell, row, rowIndex, extraData) => (
        <Link to={`/ticket/${row._id}`}>{row.subject}</Link>
      ),
    },
    { dataField: "status", text: "Status" },
    {
      dataField: "priority",
      text: "Priorité",
      style: (cell, row, rowIndex, colIndex) => {
        if (cell === "Elevée") {
          return {
            backgroundColor: "red",
          };
        } else if (cell === "Moyenne") {
          return {
            backgroundColor: "orange",
          };
        }
        return {
          backgroundColor: "green",
        };
      },
    },
    { dataField: "openAt", text: "Date d'ouverture" },
  ];
  return (
    <>
      <Container>
        {/*<Table className="table table-striped table-dark">
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
        </Table> */}
        {searchTicketList.length ? (
          <BootstrapTable
            classes="table table-striped table-dark"
            hover
            keyField="id"
            data={data}
            columns={columns}
            responsive
            pagination={paginationFactory()}
          />
        ) : (
          <Table className="table table-striped table-dark">
            <tr>
              <td colSpan="5" className="text-center">
                Vous n'avez auncun ticket de reclamation en cours{""}
              </td>
            </tr>
          </Table>
        )}
      </Container>
    </>
  );
};

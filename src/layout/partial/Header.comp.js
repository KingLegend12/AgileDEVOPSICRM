import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import logo from "../../assets/img/dev.png";
import "./FooterButtons.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Collapse from "react-bootstrap/Collapse";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { userLogout } from "../../api/userApi";
export const Header = () => {
  const history = useHistory();
  const logMeOut = () => {
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("crmSite");
    userLogout();
    history.push("/");
  };
  const { user } = useSelector((state) => state.user);
  return (
    <Navbar collapseOnSelect bg="" variant="dark" expand="md">
      <Navbar.Brand>
        <img src={logo} alt="logo" width="65px" />
      </Navbar.Brand>

      <h3
        style={{
          "text-shadow":
            "0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px orangered, 0 0 80px orangered, 0 0 90px orangered, 0 0 100px orangered, 0 0 150px orangered",
        }}
      >
        Bienvenue Admin {user.name}
      </h3>
      <h3
        style={{
          "text-shadow":
            "0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px orangered, 0 0 80px orangered, 0 0 90px orangered, 0 0 100px orangered, 0 0 150px orangered",
          "margin-left": "20px",
        }}
      >
        Specialité: {user.speciality}
      </h3>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to="/dashboard">
            <Nav.Link>
              <Button variant="outline-light" size="lg" className="HeaderBTN">
                L'interface
              </Button>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Allclients">
            <Nav.Link>
              <Button variant="outline-light" size="lg" className="HeaderBTN">
                Les clients
              </Button>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/P-Btickets">
            <Nav.Link>
              <Button variant="outline-light" size="lg" className="HeaderBTN">
                Les tickets P_B
              </Button>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/P-Mtickets">
            <Nav.Link>
              <Button variant="outline-light" size="lg" className="HeaderBTN">
                Les tickets P_M
              </Button>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/P-Etickets">
            <Nav.Link>
              <Button variant="outline-light" size="lg" className="HeaderBTN">
                Les tickets P_E
              </Button>
            </Nav.Link>
          </LinkContainer>
          <Nav.Link onClick={logMeOut}>
            <Button variant="outline-light" size="lg" className="HeaderBTN">
              Se Deconnecter
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

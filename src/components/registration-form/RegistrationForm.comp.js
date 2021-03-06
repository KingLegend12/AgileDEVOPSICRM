import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { newAdminRegistration } from "./userRegAction";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  name: "Donald Trump",
  phone: "0611111111",
  email: "fakeemail2@email.com",
  company: "Mac Code",
  address: "Texas",

  password: "sfsd#3Dsg",
  confirmPass: "sfsd#3Dsg",
};
const passVerificationError = {
  isLenthy: false,
  hasUpper: false,
  hasLower: false,
  hasNumber: false,
  hasSpclChr: false,
  confirmPass: false,
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState(initialState);
  const [passwordError, setPasswordError] = useState(passVerificationError);
  const [typevalue, settypeValue] = useState("Selectioner");
  const [typevalue1, settypeValue1] = useState("Selectioner");
  const { isLoading, status, message } = useSelector(
    (state) => state.registration
  );

  useEffect(() => {}, [newUser]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setNewUser({ ...newUser, [name]: value });

    if (name === "password") {
      const isLenthy = value.length > 8;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpclChr = /[@,#,$,%,&]/.test(value);

      setPasswordError({
        ...passwordError,
        isLenthy,
        hasUpper,
        hasLower,
        hasNumber,
        hasSpclChr,
      });
    }

    if (name === "confirmPass") {
      setPasswordError({
        ...passwordError,
        confirmPass: newUser.password === value,
      });
    }
  };
  const handleSelect2 = (e) => {
    console.log(e);
    settypeValue(e);
  };
  const handleSelect3 = (e) => {
    console.log(e);
    settypeValue1(e);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    // console.log(newUser);
    const { name, phone, email, company, address, password } = newUser;

    const newRegistration = {
      name,
      phone,
      email,
      company,
      address,
      password,
      speciality: typevalue,
      etape: typevalue1,
    };
    dispatch(newAdminRegistration(newRegistration));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-info">Cre??r un compte</h1>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {message && (
            <Alert variant={status === "success" ? "success" : "danger"}>
              {message}
            </Alert>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group>
              <Form.Label>Nom complet</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleOnChange}
                placeholder="Your name"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Telephone</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                value={newUser.phone}
                onChange={handleOnChange}
                placeholder="Phone"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleOnChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nom de l'entreprise</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={newUser.company}
                onChange={handleOnChange}
                placeholder="Company name"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Addresse</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={newUser.address}
                onChange={handleOnChange}
                placeholder="Full address"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>specialite</Form.Label>

              <DropdownButton
                alignRight
                title={typevalue}
                value={typevalue}
                id="dropdown-menu-align-right"
                onSelect={handleSelect2}
                required
              >
                <Dropdown.Item eventKey="Pedagogique">
                  Pedagogique
                </Dropdown.Item>
                <Dropdown.Item eventKey="Technique">Technique</Dropdown.Item>
                <Dropdown.Item eventKey="R??seau">R??seau</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <Form.Group>
              <Form.Label>Etape</Form.Label>

              <DropdownButton
                alignRight
                title={typevalue1}
                value={typevalue1}
                id="dropdown-menu-align-right"
                onSelect={handleSelect3}
                required
              >
                <Dropdown.Item eventKey="En attente de la reponse de l'operateur">
                  En attente de la reponse de l'operateur
                </Dropdown.Item>
                <Dropdown.Item eventKey="Traitement">Traitement</Dropdown.Item>
                <Dropdown.Item eventKey="Fermer">Fermer</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <Form.Group>
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleOnChange}
                placeholder="Password"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirmer le mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="confirmPass"
                value={newUser.confirmPass}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                required
              />
            </Form.Group>
            <Form.Text>
              {!passwordError.confirmPass && (
                <div className="text-danger mb-3">MDP non synchronis??!</div>
              )}
            </Form.Text>

            <ul className="mb-4">
              <li
                className={
                  passwordError.isLenthy ? "text-success" : "text-danger"
                }
              >
                Min 8 characters
              </li>
              <li
                className={
                  passwordError.hasUpper ? "text-success" : "text-danger"
                }
              >
                At least one upper case
              </li>
              <li
                className={
                  passwordError.hasLower ? "text-success" : "text-danger"
                }
              >
                At least one lower case
              </li>
              <li
                className={
                  passwordError.hasNumber ? "text-success" : "text-danger"
                }
              >
                At least one number
              </li>
              <li
                className={
                  passwordError.hasSpclChr ? "text-success" : "text-danger"
                }
              >
                At least on of the special characters i.e @ # $ % &{" "}
              </li>
            </ul>

            <Button
              variant="primary"
              type="submit"
              disabled={Object.values(passwordError).includes(false)}
            >
              Submit
            </Button>
            {isLoading && <Spinner variant="info" animation="border" />}
          </Form>
        </Col>
      </Row>
      <Row className="py-4">
        <Col>
          Already have an account <a href="/">Login Now</a>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserProfile } from "../../pages/dashboard/userAction";
import { useHistory, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { loginPending, loginSuccess, loginFail } from "./Login.Slice";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../api/userApi";
export const LoginForm = ({ frmSwitcher }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation();
  const { isLoading, error } = useSelector((state) => state.login);
  useEffect(() => {
    sessionStorage.getItem("accessJWT") && history.push("/dashboard");
  }, [history]);
  const [email, setEmail] = useState("d.jaidi@aui.ma");
  const [password, setPassword] = useState("sfsd#3Dsga");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
    console.log(name, value);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Veuillez remplir les champs");
    }
    dispatch(loginPending());
    try {
      const isAuth = await userLogin({ email, password });

      if (isAuth.status === "error") {
        return dispatch(loginFail(isAuth.message));
      }

      dispatch(loginSuccess());
      dispatch(getUserProfile());
      history.push("/dashboard");
    } catch (error) {
      dispatch(loginFail(error.message));
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-info text-center">Se Connecter</h1>
          <hr></hr>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form autoComplete="off" onSubmit={handleOnSubmit}>
            <Form.Group>
              <Form.Label>Addresse Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleOnChange}
                value={email}
                placeholder="Entrez votre addresse email"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleOnChange}
                value={password}
                placeholder="Mot de passe"
                required
              />
            </Form.Group>
            <Button type="submit">Se connecter</Button>
            {isLoading && <Spinner variant="primary" animation="border" />}
          </Form>
          <hr />
        </Col>
      </Row>

      <Row>
        <Col>
          <a href="#!" onClick={() => frmSwitcher("reset")}>
            Mot de passe oublié ?
          </a>
        </Col>
      </Row>
      <Row className="py-4">
        <Col>
          <a href="/registration">Créer un compte</a>
        </Col>
      </Row>
    </Container>
  );
};
LoginForm.propTypes = {
  frmSwitcher: PropTypes.func.isRequired,
};

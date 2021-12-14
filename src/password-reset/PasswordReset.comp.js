import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
export const ResetPassword = ({
  handleOnChange,
  handleOnResetSubmit,
  email,
  frmSwitcher,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-info text-center">
            Réinitialiser le mot de passe
          </h1>
          <hr></hr>
          <Form autoComplete="off" onSubmit={handleOnResetSubmit}>
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

            <Button type="submit">Envoyer le code</Button>
          </Form>
          <hr />
        </Col>
      </Row>

      <Row>
        <Col>
          <a href="#!" onClick={() => frmSwitcher("login")}>
            Se Connecter ?
          </a>
        </Col>
      </Row>
      <Row>
        <Col>
          <a href="resetpasswordform">Testing Forgot pass interface</a>
        </Col>
      </Row>
    </Container>
  );
};
ResetPassword.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  handleOnResetSubmit: PropTypes.func.isRequired,
  frmSwitcher: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

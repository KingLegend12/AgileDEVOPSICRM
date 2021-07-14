import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";
import { shortText } from "../../utils/validation";
import "./add-ticket-form.style.css";
import { useDispatch, useSelector } from "react-redux";
import { addNewClient } from "../../pages/dashboard/userAction";
import { restSuccessMSg } from "../../pages/dashboard/userSlice";
const initialFrmDt = {
  name: "",
  message: "",
};
const initialFrmError = {
  subject: false,
  issueDate: false,
  message: false,
};

export const AddTicketForm = () => {
  const [frmData, setFrmData] = useState(initialFrmDt);
  const [frmDataError, setFrmDataError] = useState(initialFrmError);
  const [cmbvalue, setcmbValue] = useState("Selectioner");
  let RealSuccessMss = "Utilisateur Ajouté avec succéss";
  const dispatch = useDispatch();
  let successMsg = true;
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFrmData({
      ...frmData,
      [name]: value,
    });
    console.log(name, value);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setFrmDataError(initialFrmError);

    setFrmDataError({
      ...initialFrmError,
    });

    dispatch(addNewClient({ ...frmData }));

    //console.log("Form submit request received", frmData);
  };

  return (
    <Jumbotron style={{ background: "none" }} className="mt-3 add-new-ticket">
      <h1 className="text-center">Ajouter un Nouveau Client</h1>
      <hr style={{ backgroundColor: "orangered" }} />
      <div>
        {successMsg && <Alert variant="primary"> {RealSuccessMss}</Alert>}
      </div>
      <Form autoComplete="off" onSubmit={handleOnSubmit}>
        <Form.Group>
          <Form.Label>Nom complet</Form.Label>
          <Form.Control
            name="name"
            value={frmData.name}
            onChange={handleOnChange}
            minLength="3"
            maxLength="50"
            placeholder="..."
            required
          />
          <Form.Text className="text-danger">
            {/*frmDataError.subject && "Subject is required !"*/}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Nom de l'entreprise</Form.Label>
          <Form.Control
            name="company"
            value={frmData.company}
            onChange={handleOnChange}
            placeholder="..."
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Addresse</Form.Label>
          <Form.Control
            name="address"
            value={frmData.address}
            onChange={handleOnChange}
            placeholder="..."
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Telephone</Form.Label>
          <Form.Control
            name="phone"
            value={frmData.phone}
            onChange={handleOnChange}
            placeholder="..."
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>email</Form.Label>
          <Form.Control
            name="email"
            value={frmData.email}
            onChange={handleOnChange}
            placeholder="..."
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            name="password"
            value={frmData.password}
            onChange={handleOnChange}
            placeholder="..."
            required
          />
        </Form.Group>

        <Button type="submit" variant="info">
          Ajouter
        </Button>
      </Form>
    </Jumbotron>
  );
};
// AddTicketForm.propTypes = {
//   handleOnSubmit: PropTypes.func.isRequired,
//   handleOnChange: PropTypes.func.isRequired,
//   frmDt: PropTypes.object.isRequired,
//   frmDataErro: PropTypes.object.isRequired,
// };

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { replyOnTicket } from "../../pages/ticket-lists/ticketsAction";

import { getUserProfile } from "../../pages/dashboard/userAction";
export const UpdateTicket = ({ _id }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  const {
    user: { name },
  } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const msgObj = {
      message,
      sender: name,
    };
    console.log(msgObj);
    dispatch(replyOnTicket(_id, msgObj));
    setMessage("");
  };
  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Label>Reply</Form.Label>
      <Form.Text>
        <h4>Veuillez repondre à notre client ici</h4>
      </Form.Text>
      <Form.Control
        value={message}
        onChange={handleOnChange}
        as="textarea"
        rows={3}
        name="detail"
      />
      <div className="text-right mt-4">
        <Button variant="info" type="submit">
          Repondre
        </Button>
      </div>
    </Form>
  );
};
UpdateTicket.propTypes = {
  _id: PropTypes.string.isRequired,
};

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import "./MessageHistory.style.css";
import { getUserProfile } from "../../pages/dashboard/userAction";

export const MessageHistory = ({ msg }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  const { user } = useSelector((state) => state.user);
  console.log(msg);
  if (!msg) return null;
  return msg.map((row, i) => (
    <div
      key={i}
      style={{
        "flex-direction": row.sender == user.name ? "row" : "row-reverse",
        color: row.sender == user.name ? "black" : "blue",
      }}
      className="message-history mt-3"
    >
      <div
        className="send font-weight-bold text-secondary"
        style={{
          "box-shadow": " 0px 0px 30px orangered",
          "border-radius": "1rem",
          padding: "1rem",
          "flex-direction": row.sender == user.name ? "row" : "row-reverse",
        }}
      >
        <div className="sender">{row.sender}</div>
        <div className="date">
          {row.msgAt && new Date(row.msgAt).toLocaleString()}
        </div>
      </div>
      <div className="message"> {row.message}</div>
    </div>
  ));
};

MessageHistory.propTypes = {
  msg: PropTypes.array.isRequired,
};

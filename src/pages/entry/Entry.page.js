import React, { useState } from "react";
import "./Entry.style.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import { LoginForm } from "../../components/login/Login.comp";
import { ResetPassword } from "../../password-reset/PasswordReset.comp";
import UpdatePasswordForm from "../../password-reset/UpdatePasswordForm.comp";
const Entry = () => {
  const [frmLoad, setFrmLoad] = useState("login");
  const handleOnResetSubmit = (e) => {
    e.preventDefault();
  };

  const frmSwitcher = (frmType) => {
    setFrmLoad(frmType);
  };

  return (
    <div className="entry-page" id="classicformpage">
      <Jumbotron
        className="form-box"
        style={{
          backgroundColor: "none",
          "box-shadow": "0px -16px 60px orangered",
        }}
      >
        {frmLoad === "login" && <LoginForm frmSwitcher={frmSwitcher} />}
        {frmLoad === "reset" && (
          <ResetPassword
            //handleOnChange={handleOnChange}
            handleOnResetSubmit={handleOnResetSubmit}
            frmSwitcher={frmSwitcher}
            //email={email}
          />
        )}
        {frmLoad === "pinnumber" && (
          <UpdatePasswordForm
            //handleOnChange={handleOnChange}
            handleOnResetSubmit={handleOnResetSubmit}
            frmSwitcher={frmSwitcher}
            //email={email}
          />
        )}
      </Jumbotron>
    </div>
  );
};

export default Entry;

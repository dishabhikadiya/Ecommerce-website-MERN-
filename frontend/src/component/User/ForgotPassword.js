import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useAlert } from "react-alert";
import MetaData from "../layout/MataData";
import axios from "axios";
function ForgotPassword() {
  const alert = useAlert();

  const [email, setEmail,loader] = useState("");
  // const [loader, setloader] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setloader(true);
      await axios.post(`http://localhost:4000/api/v1/password/forgot`, {
        email,
        credentials: "include",
      });
      alert.success("Email sent successfully");
      console.log("Reset password email sent!");
    } catch (error) {
      // setloader(false);
      alert.error(error);
      console.error("Error occurred:", error);
    }
  };
  return (
    <Fragment>
      {loader ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form className="forgotPasswordForm" onSubmit={handleSubmit}>
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ForgotPassword;

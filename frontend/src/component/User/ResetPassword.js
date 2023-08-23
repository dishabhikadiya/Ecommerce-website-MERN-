import React, { Fragment, useState } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import axios from "axios";
import MetaData from "../layout/MataData";
import { useHistory } from "react-router-dom";

const ReserPassword = (token) => {
  const alert = useAlert();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword, loader] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.put(` http://localhost:3000/api/v1/password/reset/${token}`, {
        password,
        confirmPassword,
        credentials: "include",
      });
      // history.push("/profile");
      console.log("Password reset successful!");
      alert.success("Password reset Successfully");
    } catch (error) {
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
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form className="resetPasswordForm" onSubmit={handleSubmit}>
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ReserPassword;

import React, { Fragment, useState } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useAlert } from "react-alert";
import MetaData from "../layout/MataData";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const UpdatePassword = () => {
  const alert = useAlert();
  const history = useHistory();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loader, setloader] = useState(false);

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      console.error("New password and confirm password do not match");
      return;
    }
    const requestData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    setloader(true);
    fetch(`http://localhost:4000/api/v1/password/update`, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          setloader(false);
          alert.success("Profile Updated Successfully");
          history.push("/profile");
          console.log("Password updated successfully");
        } else {
          console.error("Error updating password");
          alert.error("Error updating password");
        }
      })
      .catch((error) => {
        setloader(false);
        console.error("Network error:", error);
      });
  };

  return (
    <Fragment>
      {loader ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;

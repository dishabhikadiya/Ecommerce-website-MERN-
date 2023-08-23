import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import MetaData from "../layout/MataData";
// import { Link } from "@material-ui/core";
// import axios from "axios";
import "./Profile.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import Loader from "../layout/Loader/Loader";
// import { useHistory } from "react-router-dom";
const Profile = () => {
  const [user, setUser, loading] = useState();
  useEffect(() => {
    fetch(`http://localhost:4000/api/v1/me`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUser(data.user))
      .catch((error) => console.error(error));
    console.log("user", user);
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user?.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user?.avatar?.url} alt={user?.name} />
              <NavLink to="updateprofile">Edit Profile</NavLink>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user?.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user?.createdAt).substr(0, 10)}</p>
              </div>
              <div>
                <NavLink to="orders">orders</NavLink>
                <NavLink to="updatepassword">Change Password</NavLink>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;

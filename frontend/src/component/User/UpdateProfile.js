import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useAlert } from "react-alert";
import MetaData from "../layout/MataData";
import axios from "axios";

const UpdateProfile = ({ history }) => {
  const alert = useAlert();

  const [error, isUpdated] = useState();
  const [user] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/images/Profile.png");

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  const [loader, setLoader] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    fetch(`http://localhost:4000/api/v1/me/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(profileData),
    })
      .then((response) => {
        setLoader(false);
        if (response.ok) {
          if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(avatar);
          }
          if (isUpdated) {
            alert.success("Profile Updated Successfully");

            history.push("/profile");
            isUpdated();
          }
        } else {
          if (error) {
            alert.error(error);
          }
        }
      })
      .catch((error) => {
        setLoader(false);
        // Handle network errors or other exceptions
        // Perform any necessary actions (e.g., show an error message)
      });
  };
  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const updateProfileSubmit = () => {
    // e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      console.log("previw chnage -- ", reader.result, reader.readyState === 2);
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
        setProfileData({
          ...profileData,
          avatar: reader.result,
        });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  console.log("data avtar -- ", avatar);
  return (
    <Fragment>
      {loader ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form className="updateProfileForm" encType="multipart/form-data">
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                  onClick={handleSubmit}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;

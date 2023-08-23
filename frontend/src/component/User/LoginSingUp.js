import React, { Fragment, useRef } from "react";
import "./LoginSingUp.css";
import { AiOutlineMail } from "react-icons/ai";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { useState } from "react";
import { AiOutlineUnlock, AiFillLock } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
const LoginSingUp = () => {
  const alert = useAlert();
  const history = useHistory();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail, loading] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/images/profile.png");
  const loginSubmit = (e) => {
    e.preventDefault();
    try {
      // console.log(loginPassword, "loginPassword");
      let data = JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:4000/api/v1/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      console.log();
      axios
        .request(config)
        .then((response) => {
          alert.success("success");
          history.push("/profile");
          console.log(response.data.token);
          document.cookie = `token=${response.data.token}`;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e, "===");
    }
    console.log("submitting");
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  // console.log("avrtararat", avatar);
  const registerSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", user.name);
    myForm.append("email", user.email);
    myForm.append("password", user.password);
    myForm.append("avatar", avatar);
    console.log("form submite", myForm);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/register",
        myForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            isAuthenticated: true,
          },
        }
      );
      if (response.ok) {
        console.log("User registered successfully");
        alert.success("success");
        history.push("/profile");
      } else {
        console.log("Registration failed");
        // alert.error(error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <AiOutlineMail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <AiOutlineUnlock />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <NavLink to="/forgot">Forget Password ?</NavLink>

                <input
                  type="submit"
                  value="Login"
                  className="loginBtn"
                  // onClick={loginsub}
                />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FiUser />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <AiOutlineMail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <AiFillLock />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSingUp;

import React, { useState } from "react";
import { Fragment } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import axios from "axios";
import "./Header.css";
const UserOptions = (user) => {
  const [open, setOpan] = useState(false);
  const history = useHistory();
  const alert = useAlert();
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "logout", func: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history.push("/admin/deshbord");
  }
  function orders() {
    history.push("/orders");
  }

  function account() {
    history.push("/profile");
  }

  function logoutUser() {
    const logout = () => {
      axios
        .get(`http://localhost:4000/api/v1/logout`)
        .then((response) => {
          alert.success("logout success");
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Logout failed", error);
        });
    };
    logout();
    history.push("/login");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        style={{ zIndex: "11" }}
        ariaLabel="speedDail tooltip example"
        onClose={() => setOpan(false)}
        onOpen={() => setOpan(true)}
        className="speedDial"
        open={open}
        icon={
          <img
            src={user?.avatar?.url ? user.avatar.url : "/images/profile.png"}
            className="speedDialIcon"
            alt="profile"
            dir="down"
          />
        }
      >
        {" "}
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          ></SpeedDialAction>
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;

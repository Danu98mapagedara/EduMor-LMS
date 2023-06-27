import React from "react";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import Logo from "../../../Assets/LogoC.png";
import "./SASidebar.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const SASidebar = () => {

  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch({
      type: "RESET_USER",
      payload: {
        isLoggedIn: false,
        users: null,
        token: null,
      },
    });
    localStorage.removeItem("AUTH_TOKEN");
    window.location.replace("/login");
  };
  
  return (
    <div className="side-bar-sa">
      <div className="top">
        <div className="logo-details">
          <img className="logo-img" src={Logo} />
          <span className="logo-name">EduMor</span>
        </div>
      </div>
      <div className="center">
        <ul className="nav-links">
          <li >
            <NavLink to="/superAdminDashboard" className={({ isActive }) => (isActive ? "active" : "")}><a>
              <DashboardOutlinedIcon />
              <span className="link_name">Overview</span>
            </a>
            </NavLink>
          </li>
           <li >
            <NavLink to="/adminSignup" className={({ isActive }) => (isActive ? "active" : "")}><a>
              <GroupAddOutlinedIcon />
              <span className="link_name">Create Admins</span>
            </a>
            </NavLink>
          </li>
        </ul>
        <div class="LogoutButton">
                  <button
                    type="button"
                    name="submit"
                    class="btn btn-primary logout-btn"
                    onClick={() => {
                      logoutUser();
                    }}
                  >
                    Logout
                  </button>
                </div>
      </div>
    </div>
  );
};

export default SASidebar;

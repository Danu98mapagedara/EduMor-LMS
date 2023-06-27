import "./SANavbar.css";
import React, { useState } from "react";
import { Avatar } from "@mui/material";
import SuperAdmin from "../../../Assets/SuperAdmin.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  
  const user = useSelector((state) => state.auth.token);

  return (
    <div className="Navbar-sa">
      <div className="wrapper-sa">
        <div className="items">
          <Link to="/overview">
            <button className="btn btn-outline-primary">View Website</button>
          </Link>
          <div className="item">
            <Link to="/profile-superAdmin">
              <Avatar
                className="avatarSuperAdmin"
                alt="Profile"
                src={SuperAdmin}
                sx={{ width: 38, height: 38 }}
              />
              <p className="superAdminName">
                {user &&
                  user.firstName &&
                  user.lastName &&
                  `${user.firstName} ${user.lastName}`}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

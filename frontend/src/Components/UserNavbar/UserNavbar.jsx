import React from "react";
import "./UserNavbar.css";
import Logo from "../../Assets/Logobg.png";
import { Link } from "react-router-dom";

function UserNavbar() {
  return (
    <div className="login-page">
      <div className="navbar">
        <div className="logo">
          <img className="logo-img" src={Logo} />
          <span className="text">EduMor</span>
        </div>
        <div className="menu">
          <ul>
            <Link to="/">
              <li>Features</li>
              <li>Examinations</li>
            </Link>
            <li>
              <Link to="/Contactus">Contact Us</Link>
            </li>
          </ul>
        </div>
        <Link to="/signup">
          <button type="button" value="signup" className="button-user">
            SignUp
          </button>
        </Link>
      </div>
    </div>
  );
}

export default UserNavbar;

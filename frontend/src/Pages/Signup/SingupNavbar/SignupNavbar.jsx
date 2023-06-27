import React from "react";
import "./SignupNavbar.css";
import Logo from "../../../Assets/Logobg.png";
import { Link } from "react-router-dom";


function SignupNavbar() {
  return (
    <div className="login-page">
      <div className="signupnavbar">
        <div className="signuplogo">
          <img className="signuplogo-img" src={Logo} />
          <span className="signuptext">EduMor</span>
        </div>
        <div className="signupmenu">
          <ul>
            <Link to="/land">
            <li>Features</li>
            <li>Examinations</li>
            <li>Contact Us</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SignupNavbar;

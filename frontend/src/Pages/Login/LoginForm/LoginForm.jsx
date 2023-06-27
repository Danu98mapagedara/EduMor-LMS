import React, { useState } from "react";
import "./LoginForm.css";
import loginImg from "../../../Assets/imagelogin2.png";
import InputBox from "../../../Components/Inputs/Input";
import { Link } from "react-router-dom";
import Button from "../../../Components/Buttons/Button";
import axios from "axios";
import jwt_decode from "jwt-decode";

function LoginForm(setUser, setIsLoggedIn) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    const data = {
      email,
      password,
    };

    // axios
    //   .post("http://localhost:8000/auth/login", data)
    //   .then((response) => {
    //     const token = response.data.token;
    //     window.location.replace("/");

    //     localStorage.setItem("AUTH_TOKEN", JSON.stringify(token));

    //     const decodedToken = jwt_decode(token);
    //     setUser(decodedToken);
    //     setIsLoggedIn(true);
    //   })
    //   .catch((error) => {
    //     window.alert(error.response.data.msg);
    //   });

    axios.post("http://localhost:8000/auth/login", data)
  .then((response) => {
    const token = response.data.token;
    localStorage.setItem("AUTH_TOKEN", JSON.stringify(token));

    const decodedToken = jwt_decode(token);
   

    // Check user role and redirect accordingly
    const userRole = decodedToken.userRole;
    if (userRole === "Student") {
      window.location.replace("/overview");
    } else if (userRole === "Admin") {
      window.location.replace("/adminOverview");
    } else if (userRole === "SuperAdmin") {
      window.location.replace("/superAdminDashboard");
    }
    setUser(decodedToken);
    setIsLoggedIn(true);
  })
  .catch((error) => {
    window.alert(error.response.data.msg);
  });


  };

  return (
    <div className="login-container" style={{ display: "flex" }}>
      <div className="login-form">
        <h6>Hello!</h6>
        <h6 style={{ fontWeight: "bold" }}>Happy to see you again</h6>
        <h5>Login to your account</h5>
        <form onSubmit={handleSubmit}>
          <InputBox
            title="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {emailError !== "none" && (
            <div style={{ color: "red" }}>{emailError}</div>
          )}
          <InputBox
            title="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {passwordError !== "none" && (
            <div style={{ color: "red" }}>{passwordError}</div>
          )}

          <div className="loginfeature">
            {/* <div className="check" style={{color:"#041083", fontSize:"small"}}>
          <input type="checkbox" id="remember" name="remember" /><label for="remember"> Remember me</label>
          </div> */}
            <Link to="/forgotPassword">
              <text>Forgot password?</text>
            </Link>
          </div>
          <div className="loginbtn">
            <Button buttonName="Login" type="submit" />
          </div>
        </form>
        <div className="signup">
          <div>
            <text>Don't have an account?</text>
          </div>
          <div>
            <Link to="/Signup">
              <h6>
                <u>Sign-Up</u>
              </h6>
            </Link>
          </div>
        </div>
      </div>
      <div className="login-img">
        <img src={loginImg} />
      </div>
    </div>
  );
}

export default LoginForm;

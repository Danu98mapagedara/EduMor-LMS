import React, { useState } from "react";
import "../SignupForm/SignupForm.css";
import InputBox from "../../../Components/Inputs/Input";
import Button from "../../../Components/Buttons/Button";
import { Link } from "react-router-dom";
import SignupImg from "../../../Assets/sign-up.png";
import axios from "axios";

function SignupForm() {

  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmpasswordError, setConfirmPasswordError] = useState('');
  const [phonenumberError, setPhoneNumberError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (fnameError == 'none' && lnameError == 'none' && fnameError == 'none' && passwordError == 'none' && confirmpasswordError == 'none' && phonenumberError == 'none') {
      const data = {
        firstName, lastName, email, password, phonenumber, userRole: 'Student'
      };
      const { response, error } = await axios.post(`http://localhost:8000/auth/register`, data);
      if (error) {
        if (error.response.data.success === false) {
          window.alert(error.response.data.msg);
        } else {
          window.alert(response.data.msg);
        }
      }
      alert("Check Your email for the verification link");
      window.location.reload();
    }
  };

  return (
    <div className="signup-container" style={{ display: "flex" }}>
      <div className="login-form">
        <h2>Sign-Up Now for EduMor</h2>
        <form onSubmit={handleSubmit}>

          <InputBox
            title="First Name"
            name="fname"
            type="fname"
            value={firstName}
            onChange={(e) => {
              if (!e.target.value) {
                setFnameError("The First Name cannot be empty");
              } else if (/\d/.test(e.target.value)) {
                setFnameError('Name should not contain numbers');
              } else {
                setFnameError('none');
                setFirstname(e.target.value);
              }
            }}


          />
          {fnameError !== 'none' && <div style={{ color: 'red' }}>{fnameError}</div>}
          <InputBox
            title="Last Name"
            name="lname"
            type="lname"
            value={lastName}
            onChange={(e) => {
              if (!e.target.value) {
                setLnameError("The First Name cannot be empty");
              } else if (/\d/.test(e.target.value)) {
                setLnameError('Name should not contain numbers');
              } else {
                setLnameError('none');
                setLastname(e.target.value);
              }
            }}

          />
          {lnameError !== 'none' && <div style={{ color: 'red' }}>{lnameError}</div>}

          <InputBox
            title="Phone Number"
            name="phonenumber"
            type="tel"
            value={phonenumber}
            onChange={(e) => {
              if (!/^[0-9\b]+$/.test(e.target.value)) {
                setPhoneNumberError("Phone number must contain only digits");
              } else if (e.target.value.length !== 10) {
                setPhoneNumberError('Phone number must be exactly 10 digits long');
              } else {
                setPhoneNumberError('none');
                setPhoneNumber(e.target.value);
              }
            }}
          />
          {phonenumberError !== 'none' && <div style={{ color: 'red' }}>{phonenumberError}</div>}

          <InputBox
            title="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              const inputEmail = e.target.value;
              if (!inputEmail) {
                setEmailError("The email cannot be empty");
              } else if (!inputEmail.includes("@")) {
                setEmailError('Email is not valid');
              } else {
                setEmailError('none');
                setEmail(inputEmail);
              }
            }}

          />
          {emailError !== 'none' && <div style={{ color: 'red' }}>{emailError}</div>}

          <InputBox
            title="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value.length < 8) {
                setPasswordError('Password must be at least 8 characters long');
              } else if (!e.target.value.match(/[a-z]/g)) {
                setPasswordError('Password must contain at least one lowercase letter');
              } else if (!e.target.value.match(/[A-Z]/g)) {
                setPasswordError('Password must contain at least one uppercase letter');
              } else if (!e.target.value.match(/[0-9]/g)) {
                setPasswordError('Password must contain at least one number');
              } else {
                setPasswordError('none');
                setPassword(e.target.value);
              }
            }}
          />
          {passwordError !== 'none' && <div style={{ color: 'red' }}>{passwordError}</div>}

          <InputBox
            title="Confirm Password"
            name="confirmpassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (!e.target.value) {
                setConfirmPasswordError("This field cannot be empty");
              } else if (password !== e.target.value) {
                setConfirmPasswordError('Password does not match');
              } else {
                setConfirmPasswordError('none');
                setConfirmPassword(e.target.value);
              }
            }}
          />
          {confirmpasswordError !== 'none' && <div style={{ color: 'red' }}>{confirmpasswordError}</div>}
          <div className="loginbtn">
            <Button buttonName="Sign Up" type="submit" />

          </div>
        </form>

        <div className="signup">
          <div>
            <text>Already have an account?</text>
          </div>

          <div>
            <Link to="/Login">
              <h6>
                <u>Login</u>
              </h6>
            </Link>
          </div>
        </div>
      </div>

      <div className="signup-img">
        <img src={SignupImg} />
      </div>
    </div>
  );
}

export default SignupForm;

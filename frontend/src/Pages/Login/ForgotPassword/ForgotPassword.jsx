import React, { useState } from 'react'
import Button from '../../../Components/Buttons/Button'
import UserNavbar from '../../../Components/UserNavbar/UserNavbar'
import Img from "../../../Assets/forgotPassword.jpg"
import './ForgotPassword.css'
import axios from 'axios'

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      window.alert("Email is not present");
      return;
    }
    axios.post('http://localhost:8000/auth/forgotPassword', { email }).then(res => {
      window.location.replace("/forgotPassword");
      console.log(res.data);
      window.alert("Recover email is sent. Check your email inbox");
      

    }).catch(err => {
      console.log(err.response);
      window.alert(err.response.msg);
    })
  }

  return (
    <div>
      <UserNavbar />
      <div className="forgot-password-container" style={{ display: "flex" }}>
        <div className="login-form">
          <h5>Forgot your password</h5>
          <span>Enter your email address and we will send you the recovery link</span>
          <form onSubmit={handleSubmit}>
            <label className="inputbox">
              <h6 style={{ fontWeight: 600 }}>Email</h6>
              <input className="inputfield" type="email" name="email" onChange={(e) => {
                setEmail(e.target.value);
              }} />
            </label>
            <div className="forgot-password-btn">
              <Button buttonName="Reset Password" type="submit" />
            </div>
          </form>
        </div>
        <div className="forgot-password-img">
          <img src={Img} />
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
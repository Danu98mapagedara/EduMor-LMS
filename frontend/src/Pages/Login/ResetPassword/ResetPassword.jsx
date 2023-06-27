import React, { useEffect, useState } from 'react'
import UserNavbar from '../../../Components/UserNavbar/UserNavbar'
import Img from "../../../Assets/resetPassword.jpg"
import './ResetPassword.css'
import Button from '../../../Components/Buttons/Button'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import VerifyWaiting from '../../../Assets/VerifyWaiting.jpg'
import TryAgain from '../../../Assets/TryAgain.jpg'
import TokenError from '../../../Assets/TokenError.jpg'
import jwt_decode from "jwt-decode"

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [confirmpasswordError, setConfirmPasswordError] = useState('');
  const token = useLocation().search.slice(0, useLocation().search.length).split("=").pop();
  const [error, setError] = useState("");

  const [isTokenverified, setIsTokenVerified] = useState(false);
  useEffect(() => {
    if (token) {
      axios.get(`http://localhost:8000/auth/verifyToken?token=${token}`).then(res => {
        console.log(res);
        setIsTokenVerified(true);
      }).catch(err => {
        console.log(err.response);
        setError(err.response.data.msg)
      })
    }
  }, [])
  if (error) {
    return (
      <div className='tokenError'>
        <img src={TokenError} />
        <h1>{error}</h1>
      </div>
    )
  }
  if (!token && !error) {
    return (
      <div className='tryAgain'>
        <img src={TryAgain} />
        <h1>Token is not present. Try again!</h1>
      </div>
    )
  }
  

  const handleSubmit = (e) => {
    const { email } = jwt_decode(token);
    e.preventDefault();
    axios.post(`/auth/resetPassword`, { email, newPassword: password, confirmNewPassword: confirmPassword }).then(res => {
      window.alert(res.data.msg);
      console.log(res.data);
    window.location.replace("/login");
    }).catch(err => {
      window.alert(err.response.msg);
      console.log(err.response);
    })
  }
    return (
      <div>
        <UserNavbar />
        <div className="forgot-password-container" style={{ display: "flex" }}>
          {
            isTokenverified ? <><div className="login-form">
              <h5>Enter New Password</h5>
              <form onSubmit={handleSubmit}>
                <label className="inputbox">
                  <h6 style={{ fontWeight: 600 }}>New Password*</h6>
                  <input className="inputfield" type="password" name="password" onChange={(e) => {
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
                  }} />
                  {passwordError !== 'none' && <div style={{ color: 'red' }}>{passwordError}</div>}
                </label>
                <label className="inputbox">
                  <h6 style={{ fontWeight: 600 }}>Confirm New Password*</h6>
                  <input className="inputfield" type="password" name="password" onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (!e.target.value) {
                      setConfirmPasswordError("This field cannot be empty");
                    } else if (password !== e.target.value) {
                      setConfirmPasswordError('Password does not match');
                    } else {
                      setConfirmPasswordError('none');
                      setConfirmPassword(e.target.value);
                    }
                  }} />
                  {confirmpasswordError !== 'none' && <div style={{ color: 'red' }}>{confirmpasswordError}</div>}
                </label>
                <div className="reset-password-btn">
                  <Button buttonName="Reset Password" type="submit" />
                </div>
              </form>
            </div>
              <div className="reset-password-img">
                <img src={Img} />
              </div></> : <div className='verifyWait'>
              <img src={VerifyWaiting} />
              <h1>Verifiying Please Wait...</h1>
            </div>
          }

        </div>
      </div>
    )
  }

  export default ResetPassword
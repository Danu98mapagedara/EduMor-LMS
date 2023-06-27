import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import UserNavbar from '../../../Components/UserNavbar/UserNavbar'
import Button from "../../../Components/Buttons/Button";
import './VerifyEmail.css'
import axios from 'axios';
import VerifySuccess from '../../../Assets/VerifySuccess.jpg'
import VerifyWaiting from '../../../Assets/VerifyWaiting.jpg'

function VerifyEmail() {

    const token = useLocation().search.slice(0, useLocation().search.length).split("=").pop();
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (token) {
            axios.get(`http://localhost:8000/email/verify?token=${token}`).then(res => {
                console.log(res);
                setVerified(true);
            }).catch(err => {
                console.log(err.response)
            })
        }
    })

    if (!token) {
        return (
            <p>Token is not present</p>
        )
    }
    return (
        <div>
            <UserNavbar />
            <div className="verify-email-container" style={{ display: "flex" }}>
                {
                    verified && !error ? <div className='verifySucess'>
                        <img src={VerifySuccess} />
                        <h1>You are verified!!</h1>
                        <Link to='/login'><Button buttonName="Login"/></Link>
                    </div> : error ? error : <div className='verifyWait'>
                        <img src={VerifyWaiting} />
                        <h1>Verifiying Please Wait...</h1>
                    </div>
                }
            </div>
        </div>
    )
}

export default VerifyEmail
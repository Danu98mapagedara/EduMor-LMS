import React from 'react'
import UserNavbar from '../../../Components/UserNavbar/UserNavbar'
import "./Heading.css"
import headerimg from '../../../Assets/LandingIMG.png'
import Button from '../../../Components/Buttons/Button'
import { Link } from 'react-router-dom'

export default function Heading() {
  return (
    <div className='Header'>
      <UserNavbar />
      <div className='mainheader'>
        <div className='headertext'>
          <h1>Ready for a<br />New Exam...</h1>
          <h3>But not sure how to start?</h3>
          <p>Find out is there any exam right for you.</p>
          <div className='headerbtn'>
            <Link to="/signup">
              <Button buttonName="Get Started"/>
            </Link>
          </div>
        </div>
        <div className='headerimg'>
          <img src={headerimg}></img>
        </div>
      </div>
    </div>
  )
}

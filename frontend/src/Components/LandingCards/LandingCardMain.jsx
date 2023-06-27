import React from 'react'
import './LandingCardMain.css'

export default function LandingCardMain(props) {
  return (
    <div className='land-card'>
      <h5>{props.firstTitle}</h5>
      <text>{props.secondText}</text>
    </div>
  )
}

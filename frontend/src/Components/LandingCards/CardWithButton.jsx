import React from 'react'   
import './CardWithButton.css'

export default function CardWithButton(props) {
  return (
    <div className='buttoncard'>
      <img src={props.secondaryimg} />
      <h6>{props.secondarycardtitle}</h6>
      
    </div>
  )
}

import React from 'react'
import './InputContactus.css'

function InputBoxContactus(props) {
  return (
    <div>
      <label className="inputboxcontactus">
            <h6 style={{fontWeight:600, color:"#041083"} }> {props.title}: </h6>
            <input className="inputfieldcontactus" type={props.type} onChange={props.onChange} />
        </label>
    </div>
  )
}

export default InputBoxContactus;
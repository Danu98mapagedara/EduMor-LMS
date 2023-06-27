import React from 'react'

function InputBox(props) {
  return (
    <div>
      <label className="inputbox">
            <h6 style={{fontWeight:600}}> {props.title}: </h6>
            <input className="inputfield" type={props.type} name={props.name} placeholder={props.placeholder?props.placeholder:""} onChange={props.onChange} />
        </label>
    </div>
  )
}

export default InputBox;
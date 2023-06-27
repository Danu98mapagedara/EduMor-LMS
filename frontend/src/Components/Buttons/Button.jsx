import React from 'react'

function Button(props) {
  return (
    <div>
      <div className="customButton">
        <button type={props.type} className="btn btn-primary" >
          {props.buttonName}
        </button>
        </div>
    </div>
  )
}

export default Button

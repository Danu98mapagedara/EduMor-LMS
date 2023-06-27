import React from 'react';
import PdfIcon from '../../Assets/pdf.png'
import './Pdf.css'
import { Link } from 'react-router-dom';

const Pdf = ({link,title}) => {
  return (
    <div className='pdf-icon'>
      <Link to={link} target="_blank">
        <img src={PdfIcon} alt="pdf icon" srcset="" />
      </Link>
      <p>{title}</p>
    </div>
  )
}

export default Pdf;
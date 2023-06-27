import React from 'react'
import './Footer.css'
import Company from '../../Assets/HasthiyaIT.png'
import LogoFooter from '../../Assets/LogoF.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useTranslation } from 'react-i18next';
import Contact from '../../Pages/Contact Us/Contactus';
import { Link } from 'react-router-dom';

function Footer() {
  const {t,i18n}=useTranslation();
  return (
    <div className="footer">
      <div className="footer-one">
        <div className="footerlogo">
        <img src={LogoFooter} alt='EduMor Logo' className='footer-logo'/>
        <span className='logoName'>EduMor</span>
        </div>
        <span className='copy-rights'>&copy; Hackstone 2023 - {t("All Rights Reserved")} </span>
        <div className="social">
        <a href='https://www.facebook.com/' target="_blank"><span><FacebookIcon/></span></a>
        <a href='https://twitter.com/' target="_blank"><span><TwitterIcon/></span></a>
        <a href='https://lk.linkedin.com/' target="_blank"><span><LinkedInIcon/></span></a>
        <a href='https://github.com/' target="_blank"><span><GitHubIcon/></span></a>
        </div>
      </div>
      <div className="footer-two">
        <div className="explore">
          <h7>{t("Explore")}</h7>
          <ul>
            <li><a href="#">{t("Get Started")}</a></li>
            <li><a href="#">{t("Features")}</a></li>
            <li><a href="#">{t("Examinations")}</a></li>
            <li><Link to={`/contactus`}>{t("Contact")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-three">
        <div className="contact-box">
          <h7>{t("Telephone")}</h7>
          <div className="sub-box">
            <LocalPhoneIcon/>
            <span>+94 71 234 5678</span>
          </div>
        </div>

        <div className="contact-box">
          <h7>{t("Email")}</h7>
          <div className="sub-box">
            <MarkunreadIcon/>
            <span>ContactUs@hackstone.lk</span>
          </div>
        </div>

        <div className="contact-box">
          <h7>{t("Address")}</h7>
          <div className="sub-box">
            <LocationOnIcon/>
            <span>University of Moratuwa</span>
          </div>
        </div>

      </div>
      <div className="footer-four">
        <div className="company">
          <h7>{t("Company Mentored")}</h7>
          <div className="companyImage">
            <img src={Company} alt="HasthiyaIT"/>
          </div>
        </div>
      </div>
      
      

    </div>
  )
}

export default Footer
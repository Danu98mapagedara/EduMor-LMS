import React, { useRef } from "react";
import "./Contactus.css";
import UserNavbar from "../../Components/UserNavbar/UserNavbar";
import Footer from "../../Components/Footer/Footer";
import InputBox from "../../Components/Inputs/Input";
import InputBoxContactus from "../../Components/Inputs/InputContactus";
import Button from "../../Components/Buttons/Button";
import emailjs from "@emailjs/browser";

function Contactus() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_b3pyliw",
        "template_puf00vd",
        form.current,
        "0d4uclg9dBS04JRZV"
      )
      .then(
        (result) => {
          alert("Your message has been sent successfully!");
          window.location.reload();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <UserNavbar />
      <div className="header">
        <h2>Contact Us</h2>
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <div className="container">
          <div className="contactform1">
            <label>
              <h6 style={{ fontWeight: 600, color: "#041083" }}>Name: </h6>
              <input className="nametext" type="text" name="name"></input>
            </label>
            <label>
              <h6 style={{ fontWeight: 600, color: "#041083" }}>Email: </h6>
              <input className="mailtext" type="email" name="email"></input>
            </label>
            {/* <InputBoxContactus title="Email" type="email" name="user_email" /> */}
            <label>
              <h6 style={{ fontWeight: 600, color: "#041083" }}>Message: </h6>
              <textarea className="Message" type="text" name="message"></textarea>
            </label>

            <div className="contactbutton">
              <Button buttonName="Submit" value="send" />
            </div>
          </div>
        </div>
      </form>

      <div className="contactconfirmation"></div>

      <Footer />
    </div>
  );
}

export default Contactus;

// import React, { useRef } from 'react';
// import emailjs from '@emailjs/browser';
// import UserNavbar from '../../Components/UserNavbar/UserNavbar';
// import Footer from '../../Components/Footer/Footer';
// import './Contactus.css'

// export  const Contactus = () => {
//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs.sendForm('service_b3pyliw', 'template_puf00vd', form.current, '0d4uclg9dBS04JRZV')
//       .then((result) => {
//           console.log(result.text);
//       }, (error) => {
//           console.log(error.text);
//       });
//   };

//   return (
//     <div>
//     <UserNavbar />

//     <div className='header'>
//       <h2>Contact Us</h2>
//     </div>

//     <div className='contactcontainer'>
//     <form className='contactform1' ref={form} onSubmit={sendEmail}>
//       <label className='contactname'>Name</label>
//       <input type="text" name="user_name" />
//       <label>Email</label>
//       <input type="email" name="user_email" />
//       <label>Message</label>
//       <textarea name="message" />
//       <input type="submit" value="Send" />
//     </form>
//     </div>

//     <Footer />
//     </div>
//   );
// };
// export default Contactus;

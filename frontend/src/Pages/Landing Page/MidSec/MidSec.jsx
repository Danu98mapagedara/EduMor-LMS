import React from "react";
import "./MidSec.css";
import cardImg1 from "../../../Assets/CardImg1.jpg"
import cardImg2 from "../../../Assets/CardImg2.jpg"
import cardImg3 from "../../../Assets/CardImg3.jpg"
import LandingCardMain from "../../../Components/LandingCards/LandingCardMain";
import CardWithButton from "../../../Components/LandingCards/CardWithButton";
import InputBox from "../../../Components/Inputs/Input";


export default function MidSec() {
  return (
    <div className="MidContainer">
      <div className="firstsection">
        <text className="firstsectionhead">Features________</text>
        <h6>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quasi
          excepturi maxime repudiandae facere, provident, eligendi soluta
          expedita voluptas dignissimos commodi atque, magni voluptatum officia
          animi earum et quis quaerat!
        </h6>
        <div className="firstCard">
          <LandingCardMain
            firstTitle="Choosing any Examination"
            secondText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quasi
          excepturi maxime repudiandae facere, provident, eligendi soluta
          expedita"
          />
          <LandingCardMain
            firstTitle="Attempting Quizzes"
            secondText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quasi
          excepturi maxime repudiandae facere, provident, eligendi soluta
          expedita"
          />
          <LandingCardMain
            firstTitle="Downloading Past Papers"
            secondText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quasi
          excepturi maxime repudiandae facere, provident, eligendi soluta
          expedita"
          />
        </div>

        <div>
          <h5 className="secondsectionhead">Examinations________</h5>
        <div className="secondCard">
          <CardWithButton 
            secondaryimg ={cardImg1}
            secondarycardtitle="Sri Lanka Foreign Service Examination"
          />
          <CardWithButton 
            secondaryimg ={cardImg2}
            secondarycardtitle="Sri Lanka Planning Service Examination"
          />
          <CardWithButton 
            secondaryimg ={cardImg3}
            secondarycardtitle="Sri Lanka Management Assistant's Service Examination"
          />
        </div>
        </div>

        
        
      </div>
    </div>
  );
}

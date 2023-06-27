import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
import { QuizRestriction } from '../RestrictionsMessage/Resctrction';

export default function AccordionExam(props) {
  const { levelName, quizName, quizId } = props;

  return (
    <div>
      <Accordion style={{ margin: '15px', backgroundColor: '#cbd6f9', borderRadius: '10px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography style={{ color: '#041083', fontWeight: '500' }}>{levelName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="quiz-btn" >
                <ol>
                  <li style={{ color: "#646a85", fontWeight: "normal"}}
                    onMouseOver={(e) => e.target.style.fontWeight = "bold"}
                    onMouseOut={(e) => e.target.style.fontWeight = "normal"}>
                    {quizName}
                  </li>
                </ol> 
              {/* <QuizRestriction /> */}
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

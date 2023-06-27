import React, { useEffect, useState } from 'react'
import './SAOverview.css'
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import axios from 'axios';
import withAuth from "../../../../hoc/withAuth";

function SAOverview() {
    //to retreive the count of users
    const [emailCount, setEmailCount] = useState(0);
    const [quizCount, setQuizCount] = useState(0);
    const [lectureVideoCount, setLectureVideoCount] = useState(0);
    const [examinationCount, setExaminationCount] = useState(0);
    
  //
  useEffect(() => {
    const fetchEmailCount = async () => {
      try {
        const token = 'your_token_here';

        const response = await axios.get('/auth/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const users = response.data;
        let userCount = 0;
        

        users.forEach(users => {
          if (users.email) {
            userCount++;
          }
        });

        setEmailCount(userCount);
      } catch (error) {
        console.error('Error retrieving user count:', error.response.data.message);
      }
    };
    
    //get number of quizes
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/allQuizes'); // Replace '/api/quizzes' with your actual API endpoint
        const quizzes = response.data;
        setQuizCount(quizzes.length);
      } catch (error) {
        console.error(error);
      }
    };

    //get number of lecture videos
    const fetchLectureVideoCount = async () => {
      try {
        const response = await axios.get('/lectureVideos');
        const videoCount = response.data.length;
        setLectureVideoCount(videoCount);
      } catch (error) {
        console.error('Failed to fetch lecture videos count:', error);
      }
    };

    //get number of examinations
    const fetchExaminationCount = async () => {
      try {
        const token = 'YOUR_TOKEN_HERE'; // Replace with your actual token
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get('/examinations', { headers });
        const count = response.data.length;
        setExaminationCount(count);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExaminationCount();

    fetchLectureVideoCount();

    fetchQuizzes();

    fetchEmailCount();
  }, []);

    return (
        <div className='SAOverview-secton'>
            <div className='left-container'>
                <div className='colmn1'>
                    <div className='studentsbox overviewbox'>
                    <div className='count1'>
                                {emailCount}
                            </div> 
                        <div className='overviewName'> Registered Students
                        <div className='overviewIcon'><CardMembershipIcon style={{ fontSize: 40 }} /></div>
                        </div>
                        
                        
                        
                               
                    </div>
                    <div className='videoBox overviewbox'>
                      <div className='quizcounter'>
                        {lectureVideoCount}
                      </div>
                        <div className='overviewName'>Video Modules
                        <div className='overviewIcon' ><CardMembershipIcon style={{ fontSize: 40 }} /></div>
                        </div>
                        
                        
                    </div>

                </div>
                <div className='colmn2'>
                    <div className='quizbox overviewbox'>
                    <div className='quizcounter'>
                      {quizCount}
                    </div>
                        <div className='quizName'>Quizzes
                        <div className='quizIcon'><CardMembershipIcon style={{ fontSize: 40 }} /></div>
                        </div>
                        
                        
                    </div>

                    <div className='quizbox overviewbox'>
                      <div className='quizcounter'>
                        {examinationCount}
                      </div>
                    <div className='overviewName'>Examination Modules
                    <div className='examIcon'><CardMembershipIcon style={{ fontSize: 40 }} /></div>
                    </div>
                    
                    
                </div>
                </div>
                
            </div>
        </div>

    )
}

export default withAuth(SAOverview);
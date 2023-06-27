import React, { useEffect, useState } from 'react'
import NewExamCard from '../../../Components/ExamCard/ExamCards'
import RecentAccesExamTable from '../RecentAccessExamTable/RecentAccesExamTable'
import News from '../../../Components/News/News'
import './MiddleSection.css'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { Link } from "react-router-dom";

function MiddleSection() {
    const { t } = useTranslation();
    const [exam, setExam] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("AUTH_TOKEN");
        if (!token) {
          alert("Authorization token missing");
          return;
        }
        axios.get('http://localhost:8000/examinations', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          const sortedExams = response.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
          const recentExams = sortedExams.slice(0, 3);
          setExam(recentExams);
        })
        .catch(error => {
          alert(error.message);
        });
      }, []);
      
    

    return (
        <div className="middleSection">
            <div className="title new">
                <h7>{t('New Examination Modules')}</h7>
            </div>
            <div className="newExams" style={{ display: 'flex' }}>
                {exam.map((exam, index) => {
                    return <Link key={exam._id} to={`/examinations/${exam._id}`}>
                        <NewExamCard newExamTitle={exam.examName} examImage={exam.photo} />
                    </Link>
                })}
            </div>

            <div className="recentExams">
                <div className="title recent">
                    <h7>{t('Recently Accessed Examinations')}</h7>
                </div>
                <div className="recentExamTable">
                    <RecentAccesExamTable />
                </div>
            </div>
            <div className="news">
                <News />
            </div>
        </div>
    )
}

export default MiddleSection
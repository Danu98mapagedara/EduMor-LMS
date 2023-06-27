import React, { useEffect, useState } from "react";
import ExamCard from "../../../Components/ExamCard/ExamCards";
import "./ExaminationCardsSection.css";
import Pagination from "../../../Components/Pagination/Pagination";
import axios from "axios";
import { Link } from "react-router-dom";

function ExaminationSection() {
  const [exams, setExams] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = exams.slice(firstPostIndex, lastPostIndex);

  const pageCount = Math.ceil(exams.length / postsPerPage);
  const changePage = ({ selected }) => {
    setcurrentPage(selected);
  };

  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN');
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
      setExams(response.data);
    })
    .catch(error => {
      alert(error.message);
    });
  }, []);
  

  return (
    <div className="examination-section">
      <div className="examination-cards">
        {currentPosts.map((exam, index) => {
          return (
            <Link key={exam._id} to={`/examinations/${exam._id}`}>
              <ExamCard newExamTitle={exam.examName} examImage={exam.photo} />
            </Link>
          );
        })}
      </div>
      <Pagination
        totalPosts={exams.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setcurrentPage}
        currentPage={currentPage}
        type={1}
      />
    </div>
  );
}

export default ExaminationSection;

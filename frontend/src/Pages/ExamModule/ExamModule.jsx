import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import SideBar from "../../Components/SideBar/SideBar";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import "./ExamModule.css";
import AccordionExam from "../../Components/Accordion/Accordion";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import withAuth from "../../hoc/withAuth";
import { useSelector } from "react-redux";

function ExamModule() {
  const user = useSelector((state) => state.auth.token);
  const { t } = useTranslation();
  const [exam, setExam] = useState({});
  const [quizzes, setQuizzes] = useState([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState(false);
  const { _id } = useParams();
  const token = localStorage.getItem("AUTH_TOKEN");

  useEffect(() => {
    if (_id) {
      axios
        .get(`http://localhost:8000/examinations/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setExam(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [_id]);

  useEffect(() => {
    if (exam.examination) {
      const levelIds = exam.examination.levels.map((level) => level._id);
      const promises = levelIds.map((levelId) =>
        axios.get(`http://localhost:8000/level/${levelId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
      Promise.all(promises)
        .then((responses) => {
          const quizzesByLevel = responses.map((response) => response.data);
          setQuizzes(quizzesByLevel);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [exam.examination]);

  //to check whether is user already enrolled or not
  useEffect(() => {
    const fetchEnrollmentRecords = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/enrollment/${user._id}/${_id}`
        );

        if (response.data.length > 0) {
          setEnrollmentStatus(true);

        } else {
          setEnrollmentStatus(false);

        }
      } catch (error) {
        console.error(error);
        alert("Error occurred while checking enrollment status.");
      }
    };

    fetchEnrollmentRecords();
  }, [user._id, _id]);

  //checks the enrollment
  const handleEnroll = () => {
    axios
      .post(`http://localhost:8000/enrollment`, {
        examinationId: exam.examination?._id,
        examinationName: exam.examination?.examName,
        userId: user?._id,
        photo: exam.examination?.photo,
      })
      .then((res) => {
        setEnrollmentStatus(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const renderAccordionExams = () => {
    if (!enrollmentStatus) {
      // show enroll button
      return (
        <button
          onClick={handleEnroll}
          className="btn btn-primary"
          style={{ display: "block", margin: "0 auto" }}
        >
          Enroll Now
        </button>
      );
    } else {
      // show AccordionExam
      return exam.examination?.levels.map((level, index) => {
        const quizNames = quizzes[index]?.map((quiz) => quiz.quizName);
        const quizIds = quizzes[index]?.map((quiz) => quiz._id);
        return (
          <AccordionExam
            key={index}
            quizId={quizIds}
            levelName={level.levelName}
            quizName={quizNames?.map((name, i) => (
              <Link to={`/level/quiz/${quizIds[i]}`} key={i}>
                <div key={i}>
                  {i + 1}
                  {"."} {name}
                </div>
              </Link>
            ))}
          />
        );
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="middle-contaier" style={{ display: "flex" }}>
        <SideBar />
        <div className="mainContainer">
          <Navbar />
          <div className="read-crumb">
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>
                <a href="/">{t("Overview")}</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/myExams">{t("My Exams")}</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>
                {exam.examination?.examName}
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </div>
          <section className="exam-details">
            <h6 className="exam-name">{exam.examination?.examName}</h6>
            <img src={exam.examination?.photo} alt={exam.examName} />
            <p className="exam-description">{exam.examination?.description}</p>
            <ul>
              <Link to={`/pastPapers/examination/${exam.examination?._id}`}>
              <li>Past Papers</li>
              </Link>
              <Link to={`/examination/${exam.examination?._id}`}>
                <li>
                   Lectures Videos
                </li>
              </Link>
            </ul>
            {renderAccordionExams()}
          </section>
        </div>
      </div>
      <div className="footer" style={{ display: "flex" }}>
        <Footer />
      </div>
    </div>
  );
}

export default withAuth(ExamModule);

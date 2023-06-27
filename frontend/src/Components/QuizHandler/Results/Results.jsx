import React, { useState, useEffect } from "react";
import "../Quiz/Quiz.css";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import axios from "axios";
import withAuth from "../../../hoc/withAuth";
import { useSelector } from "react-redux";

function Results({ answers, qid, level, examId, quizName,quizId }) {
  const user = useSelector((state) => state.auth.token);
  const [quizAnswer, setQuizAnswer] = useState({});
  const numCorrect = answers.filter(
    (answer, index) => answer === quizAnswer[index]?.correctAnswer
  ).length;
  const percentage = (
    (numCorrect / Object.keys(quizAnswer).length) *
    100
  ).toFixed(2);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/level/quiz/${qid}`)
      .then((res) => {
        if (res.data) {
          setQuizAnswer(res.data.questions);
        } else {
          alert("Quiz data not found");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [qid]);

  const saveQuizResults = async () => {
    const quizResults = {
      userId: user._id,
      level: level,
      examinationId: examId,
      percentage: percentage,
      quizName: quizName,
      quizId:quizId,
      quizAnswers: Object.keys(quizAnswer).map((key, index) => ({
        question: quizAnswer[key].question,
        givenAnswer: answers[index],
        correctAnswer: quizAnswer[key].correctAnswer,
      })),
    };

    try {
      await axios.post("http://localhost:8000/quizResults", quizResults);
      alert("Quiz results saved successfully!");
    } catch (error) {
      alert("Failed to save quiz results");
    }
  };

  useEffect(() => {
    if (Object.keys(quizAnswer).length > 0) {
      saveQuizResults();
    }
  }, [quizAnswer]);
  return (
    <div>
      <div className="read-crumb-quiz">
        <MDBBreadcrumb>
          <MDBBreadcrumbItem>
            <a href="/">Overview</a>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem>
            <a href="/examinations">Examination</a>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem active>Quiz</MDBBreadcrumbItem>
        </MDBBreadcrumb>
      </div>

      <div className="quiz-results">
        <h1 className="results-heading">Quiz Results</h1>
        <p className="results-summary">
          You answered {numCorrect} out of {Object.keys(quizAnswer).length}{" "}
          questions correctly.
        </p>
        <p className="results-score">
          Your score: <h2>{percentage}%</h2>
        </p>
        <ol className="results-list">
          {Object.keys(quizAnswer).map((key, index) => (
            <li
              key={key}
              className={
                answers[index] === quizAnswer[key].correctAnswer
                  ? "correct"
                  : "incorrect"
              }
            >
              <p>
                Question {index + 1}: {quizAnswer[key].question}
              </p>
              <p>Your answer: {answers[index]}</p>
              <p>Correct answer: {quizAnswer[key].correctAnswer}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default withAuth(Results);

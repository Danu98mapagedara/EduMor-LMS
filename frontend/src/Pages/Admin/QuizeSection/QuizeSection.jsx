
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

function QuizeSection() {
  const [showExamModal, setShowExamModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [examName, setExamName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [quizName, setQuizName] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizQuestions, setQuizQuestions] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [level, setLevel] = useState(false);

  const handleClose = () => {
    setShowExamModal(false);
    setShowQuizModal(false);
  };

  const handleShowExamModal = () => setShowExamModal(true);
  const handleShowQuizModal = () => setShowQuizModal(true);

  // submitExams(examName, examDescription,fileUpload);

  //   // Clear form inputs
  // setExamName('');
  // setExamDescription('');
  // setFileUpload('');

  const submitExams = (examName, description) => {
    axios.post('examinations/save', { examName, description })
      .then(response => {
        console.log(' saved successfully');
        alert("submited")
      })
      .catch(error => {
        console.error('Error saving news: ', error);
        alert("error");
        console.log(examName)
      });
  };

  

  return (
    <>
      <button variant="primary" onClick={handleShowExamModal} style={{ padding: '50px', margin: '40px 280px', fontSize: '30px', }} >
        Create Examination
      </button>
      <button variant="primary" onClick={handleShowQuizModal} style={{ padding: '50px', margin: '40px 280px', fontSize: '30px' }}>
        Create Quiz
      </button>

      <Modal show={showExamModal || showQuizModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'blue', fontSize: '24px' }}>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'lightblue', padding: '20px' }}>
          {showExamModal && (
            <>
              <div style={{ paddingTop: '10px' }}>
                <label htmlFor="examName">Exam Name:</label>
                <input type="text" id="examName" name="examName" value={examName} onChange={(event) => setExamName(event.target.value)} />
              </div>
              <div style={{ paddingTop: '10px' }}>
                <label htmlFor="examDescription">Exam Description:</label>
                <input type="text" id="examDescription" name="examDescription" value={description} onChange={(event) => setDescription(event.target.value)} />
              </div>
              <div style={{ paddingTop: '10px' }}>
                <label htmlFor="fileUpload">File Upload:</label>
                <input type="file" id="fileUpload" name="fileUpload" onChange={(event) => setPhoto(event.target.files[0])} />
              </div>
            </>
          )}
          {showQuizModal && (
            <>
              <div style={{ paddingTop: '10px' }}>
                <label htmlFor="quizName">Quiz Name:</label>
                <input type="text" id="quizName" name="quizName" value={quizName} onChange={(event) => setQuizName(event.target.value)} />
              </div>
              <div style={{ paddingTop: '10px' }}>
                <label htmlFor="quizDescription">Quiz Description:</label>
                <input type="text" id="quizDescription" name="quizDescription" value={quizDescription} onChange={(event) => setQuizDescription(event.target.value)} />
              </div>
              <div style={{ paddingTop: '10px' }}>
                <label htmlFor="quizQuestions">Quiz Questions:</label>
                <input type="text" id="quizQuestions" name="quizQuestions" value={quizQuestions} onChange={(event) => setQuizQuestions(event.target.value)} />
              </div>
              <div style={{ paddingTop: '10px' }}>
                <label htmlFor="correctAnswer">Correct Answer:</label>
                <input type="text" id="correctAnswer" name="correctAnswer" value={correctAnswer} onChange={(event) => setCorrectAnswer(event.target.value)} />
              </div>
              <div style={{ paddingTop: '10px' }}>
                <label htmlFor="level">Level:</label>
                <input type="checkbox" id="level" name="level" checked={level} onChange={(event) => setLevel(event.target.checked)} />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Close
          </button>
          {showExamModal && (
            <button variant="primary" onClick={submitExams}>
              Save Changes
            </button>
          )}
          {showQuizModal && (
            <button variant="primary">
              Save Changes
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default QuizeSection;

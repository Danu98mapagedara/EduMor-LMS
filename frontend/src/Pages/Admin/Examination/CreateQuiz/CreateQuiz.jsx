import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AddIcon from "@mui/icons-material/Add";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function CreateQuiz() {
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", answers: [], correctAnswer: "" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [exam, setExam] = useState([]);
  const [quizName, setQuizName] = useState("");
  const token = localStorage.getItem("AUTH_TOKEN");

  //get the examination data
  useEffect(() => {
    if (!token) {
      alert("Authorization token missing");
      return;
    }
    axios
      .get("http://localhost:8000/examinations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExam(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  //get levels which belongs to selected exams
  const filteredLevels =
    exam.find((exam) => exam.examName === selectedExam)?.levels || [];

  const handleExamSelect = (eventKey) => {
    setSelectedExam(eventKey);
  };

  const handleLevelSelect = (eventKey) => {
    setSelectedLevel(eventKey);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", answers: [], correctAnswer: "" },
    ]);
  };

  const handleQuestionChange = (event, index) => {
    const { name, value } = event.target;
    const updatedQuestions = [...questions];
    if (name === "answers") {
      updatedQuestions[index][name] = value
        .split("/")
        .map((answer) => answer.trim());
    } else {
      updatedQuestions[index][name] = value.trim();
    }
    setQuestions(updatedQuestions);
  };

  const handleQuizNameChange = (event) => {
    setQuizName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("submitted successfully");
    const formData = {
      quizName: quizName,
      examination: selectedExam,
      level: selectedLevel,
      questions: questions,
    };
    try {
      const response = await axios.post(
        `http://localhost:8000/level/${selectedLevel}/quiz/save`,
        formData
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateQuizClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div style={{ margin: "15px 20px 5px" }}>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleCreateQuizClick}
      >
        Create Quiz
      </button>
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Create Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit}
            style={{ height: "350px", overflowY: "scroll" }}
          >
            <Form.Group
              controlId="formQuizName"
              style={{ marginBottom: "1rem" }}
            >
              <Form.Label>Quiz Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Quiz Name"
                value={quizName}
                onChange={handleQuizNameChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formExam" style={{ marginBottom: "1rem" }}>
              <Form.Label>Examination</Form.Label>
              <DropdownButton
                title={selectedExam || "Select Examination"}
                onSelect={handleExamSelect}
                variant="outline-secondary"
              >
                {exam &&
                  exam.map((exam, index) => {
                    return (
                      <Dropdown.Item key={index} eventKey={exam.examName}>
                        {exam.examName}
                      </Dropdown.Item>
                    );
                  })}
              </DropdownButton>
            </Form.Group>

            <Form.Group controlId="formLevel">
              <Form.Label>Level</Form.Label>
              <DropdownButton
                title={selectedLevel || "Select Level"}
                onSelect={handleLevelSelect}
                variant="outline-secondary"
              >
                {filteredLevels.map((level) => (
                  <Dropdown.Item key={level.levelName} eventKey={level._id}>
                    {level.levelName}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>
            <hr />
            {questions.map((question, index) => (
              <div key={index}>
                <Form.Group controlId={`formQuestion${index}`}>
                  <Form.Label>Question {index + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    name="question"
                    placeholder="Enter the question"
                    value={question.question}
                    onChange={(event) => handleQuestionChange(event, index)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId={`formAnswer${index}`}>
                  <Form.Label>Answers</Form.Label>
                  <Form.Control
                    type="text"
                    name="answers"
                    placeholder="Enter the answers (Separate answers with slash)"
                    value={question.answers.join("/ ")}
                    onChange={(event) => handleQuestionChange(event, index)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId={`formCorrectAnswer${index}`}>
                  <Form.Label>Correct Answer</Form.Label>
                  <Form.Control
                    type="text"
                    name="correctAnswer"
                    placeholder="Enter the correct answer"
                    value={question.correctAnswer}
                    onChange={(event) => handleQuestionChange(event, index)}
                    required
                  />
                </Form.Group>
                <hr />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={handleAddQuestion}
            >
              <AddIcon />
              Add New Question
            </button>
            <hr />
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateQuiz;

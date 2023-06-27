import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from 'axios';


const CreateExamination = () => {
  const [showModal, setShowModal] = useState(false);
  const [examName, setExamName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [description, setDescription] = useState("");
  const [levels, setLevels] = useState(["Beginner", "Intermediate", "Advanced"]);

  const handleExamNameChange = (event) => {
    setExamName(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleLevelChange = (event, index) => {
    const newLevels = [...levels];
    newLevels[index] = event.target.value;
    setLevels(newLevels);
  };

  const handleCreateExam = () => {
    const data = {
      examName,
      description,
      photo: profilePicture,
      levels: levels.map((levelName) => ({ levelName }))
    };

    axios
      .post("/examinations/save", data)
      .then((response) => {
        console.log("Created examination:", response.data);
        alert("Examination created successfully")
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Failed to create examination:", error);
      });
  };

  return (
    <div style={{margin:"15px 20px 5px"}}>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Create Examination
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Examination</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="examName">
              <Form.Label>Examination name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter examination name"
                value={examName}
                onChange={handleExamNameChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Desription</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter examination description"
                value={description}
                onChange={handleDescriptionChange}
              />
              </Form.Group>
            <Form.Group controlId="profilePicture">
              <Form.Label>Examination Profile Picture</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter profile picture URL"
                value={profilePicture}
                onChange={handleProfilePictureChange}
              />
            </Form.Group>
            <Form.Group controlId="levels">
              <Form.Label>Levels</Form.Label>
              {levels.map((level, index) => (
                <Form.Control
                  key={index}
                  type="text"
                  placeholder={`Enter level ${index + 1}`}
                  value={level}
                  onChange={(event) => handleLevelChange(event, index)}
                />
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateExam}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateExamination;
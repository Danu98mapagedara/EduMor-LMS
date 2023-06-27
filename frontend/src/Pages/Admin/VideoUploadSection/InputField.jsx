import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './InputField.css';

const InputField = () => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDragEnter = () => {
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const fileList = [...e.dataTransfer.files];
    setFiles(fileList);
  };

  const handleInputChange = (e) => {
    const fileList = [...e.target.files];
    setFiles(fileList);
  };

  return (
    <Container
      className={`p-5 text-center ${dragging ? 'bg-light border border-primary' : ''} inputBox`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input type="file" onChange={handleInputChange} />
      <p style={{color:'red'}}>Drag and drop files or click to select files</p>
      {files.length > 0 && (
        <ul>
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default InputField;
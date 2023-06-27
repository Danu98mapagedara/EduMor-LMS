import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VideoUploadSection.css";

const VideoUploadSection = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [filename, setFilename] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const token = localStorage.getItem("AUTH_TOKEN");

  const handleExamChange = (event) => {
    setSelectedExam(event.target.value);
  };

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleFilenameChange = (event) => {
    setFilename(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleThumbnailChange = (event) => {
    setThumbnail(event.target.value);
  };

  const createLectureVideo = async () => {
    const lectureVideoData = {
      thumbnail: thumbnail,
      title: filename,
      description: description,
      videoUrl: videoUrl,
      examinationId: selectedExam,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/lectureVideos/",
        lectureVideoData
      );
      console.log(response.data);
      alert("ok");
    } catch (error) {
      console.error(error.response.data);
      alert("not ok");
    }
  };

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
        setExams(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <div
      className="exam-uploader"
      style={{ background: "#fff", padding: "10px", borderRadius: "10px" }}
    >
      <label htmlFor="filename" className="label">
        Video Url:
      </label>
      <input
        type="text"
        id="videoUrl"
        value={videoUrl}
        onChange={handleVideoUrlChange}
        className="input"
        style={{ borderRadius: "10px", width: "920px" }}
      />
      {!videoUrl && <p style={{ color: "red" }}>Please enter a Video url</p>}

      <label htmlFor="exams" className="label">
        Choose examination:
      </label>
      <select
        id="exams"
        value={selectedExam}
        onChange={handleExamChange}
        className="select"
        style={{ borderRadius: "10px", width: "920px" }}
      >
        <option value="">--Please choose an examination--</option>
        {exams.map((exam) => (
          <option key={exam._id} value={exam._id}>
            {exam.examName}
          </option>
        ))}
      </select>
      <label htmlFor="filename" className="label">
        Thumbnail Url:
      </label>
      <input
        type="text"
        id="thumbnail"
        value={thumbnail}
        onChange={handleThumbnailChange}
        className="input"
        style={{ borderRadius: "10px", width: "920px" }}
      />
      {!thumbnail && (
        <p style={{ color: "red" }}>Please enter a thumbnail url</p>
      )}

      <label htmlFor="filename" className="label">
        File name:
      </label>
      <input
        type="text"
        id="filename"
        value={filename}
        onChange={handleFilenameChange}
        className="input"
        style={{ borderRadius: "10px", width: "920px" }}
      />
      {!filename && <p style={{ color: "red" }}>Please enter a file name</p>}

      <label htmlFor="description" className="label">
        Description:
      </label>
      <textarea
        id="description"
        value={description}
        onChange={handleDescriptionChange}
        className="textarea"
        style={{
          borderRadius: "10px",
          width: "920px",
          resize: "none",
          height: "50px",
        }}
      />
      {!description && (
        <p style={{ color: "red" }}>Please enter a description</p>
      )}

      <button
        onClick={createLectureVideo}
        className="button"
        style={{
          borderRadius: "10px",
          padding: "10px 60px",
          margin: "10px auto",
          background: "#041083",
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default VideoUploadSection;

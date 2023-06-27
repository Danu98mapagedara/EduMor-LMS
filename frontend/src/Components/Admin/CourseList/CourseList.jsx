import React, { useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import "./CourseList.css";
import { useState } from "react";
import axios from "axios";

export default function CourseList() {
  const [exams, setExams] = useState([]);
  const token = localStorage.getItem("AUTH_TOKEN");

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
    <MDBTable align="middle" className="courseTable">
      <MDBTableHead>
        <tr>
          <th scope="col mt-6" className="course-titles">
            Course Name
          </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {exams.map((course, index) => (
          <tr key={index}>
            <td>
              <div className="d-flex align-items-center ms-5">
                <img
                  src={course.photo}
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1 course-name">{course.examName}</p>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}

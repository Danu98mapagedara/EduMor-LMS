import React, { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
} from "mdb-react-ui-kit";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import withAuth from "../../../hoc/withAuth";

function RecentAccesExamTable() {
  const { t } = useTranslation();
  const userId = useSelector((state) => state.auth.token._id);
  const token = localStorage.getItem("AUTH_TOKEN");
  const [myExams, setMyExams] = useState([]);

  useEffect(() => {
    if (!token) {
      alert("Authorization token missing");
      return;
    }
    axios
      .get(`http://localhost:8000/enrollment/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const sortedExams = res.data.enrollments.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        const latestExams = sortedExams.slice(0, 3);
        setMyExams(latestExams);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [userId]);

  return (
    <>
      {myExams.length === 0 ? (
        <div
          className="noExams"
          style={{
            minHeight: "230px",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5>You haven't enrolled in any exams.</h5>
        </div>
      ) : (
        <div
          className="examTable"
          style={{ minHeight: "225px", marginBottom: "15px" }}
        >
          <MDBTable align="middle">
            <MDBTableHead>
              <tr style={{ color: "#646a85" }}>
                <th scope="col">{t("Title")}</th>
                <th scope="col">{t("Last Accessed")}</th>
                <th scope="col">{t("Started")}</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {myExams.map((myExam, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={myExam.photo}
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <Link to={`/examinations/${myExam.examinationId}`}>
                          <p
                            className="fw-bold mb-1"
                            style={{ color: "#041083", cursor: "pointer" }}
                          >
                            {myExam.examinationName}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td style={{ margin: "auto" }}>
                    <MDBBadge
                      pill
                      style={{ fontSize: "12px", padding: "6px 15px" }}
                    >
                      {new Date(myExam.updatedAt).toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                      })}
                    </MDBBadge>
                  </td>
                  <td>
                    <MDBBadge
                      color="warning"
                      pill
                      style={{ fontSize: "12px", padding: "6px 15px" }}
                    >
                      {new Date(myExam.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                      })}
                    </MDBBadge>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      )}
    </>
  );
}

export default  withAuth(RecentAccesExamTable);
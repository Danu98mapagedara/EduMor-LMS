import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import SideBar from "../../Components/SideBar/SideBar";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import "./MyExams.css";
import axios from "axios";
import withAuth from "../../hoc/withAuth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MyExams() {
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
        setMyExams(res.data.enrollments);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [userId]);

  return (
    <div style={{ diplay: "flex", flexDirection: "column" }}>
      <div className="middle-contaier" style={{ display: "flex" }}>
        <SideBar />
        <div className="mainContainer">
          <Navbar />
          <div className="read-crumb">
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>
                <a href="/">{t("Overview")}</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>{t("My Exams")}</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </div>
          <h5>{t("My Exams")}</h5>
          <section className="exam-table">
            <MDBTable align="middle">
              <MDBTableHead>
                <tr style={{ color: "#646a85" }}>
                  <th scope="col">{t("Title")}</th>
                  <th scope="col">{t("Last Accessed")}</th>
                  <th scope="col">{t("Started")}</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {myExams.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                    You have not enrolled in any examination yet
                    </td>
                  </tr>
                ) : (
                  myExams.map((myExams, index) => {
                    return (
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            
                            <img
                              src={myExams.photo}
                              alt=""
                              style={{ width: "60px", height: "50px" }}
                              className="rounded-circle"
                            />
                            <div className="ms-">
                          <Link to={`/quizResults/${myExams.userId}/${myExams.examinationId}`}>
                              <p
                                className="fw-bold mb-1"
                                style={{ color: "#041083", cursor: "pointer" }}
                              >
                                {myExams.examinationName}
                              </p>
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p rounded size="sm">
                            {new Date(myExams.updatedAt).toLocaleString(
                              "en-US",
                              {
                                month: "short",
                                day: "2-digit",
                              }
                            )}
                          </p>
                        </td>
                        <td>
                          <p rounded size="sm">
                            {new Date(myExams.createdAt).toLocaleString(
                              "en-US",
                              {
                                month: "short",
                                day: "2-digit",
                              }
                            )}
                          </p>
                        </td>
                      </tr>
                    );
                  })
                )}
                {myExams.map((myExams, index) => {})}
              </MDBTableBody>
            </MDBTable>
          </section>
        </div>
      </div>
      <div className="footer" style={{ diplay: "flex" }}>
        <Footer />
      </div>
    </div>
  );
}

export default withAuth(MyExams);

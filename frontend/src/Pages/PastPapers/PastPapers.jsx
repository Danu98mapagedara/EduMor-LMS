import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import SideBar from "../../Components/SideBar/SideBar";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import { useTranslation } from "react-i18next";
import VideoCard from "../../Components/VideoCard/VideoCard";
import withAuth from "../../hoc/withAuth";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./PastPapers.css";
import Pdf from "../../Components/Pdf/Pdf";

function PastPapers() {
  const { t } = useTranslation();
  const { examinationId } = useParams();
  const token = localStorage.getItem("AUTH_TOKEN");
  const user = useSelector((state) => state.auth.token);
  const [pastPaper, setPastPaper] = useState([]);

  useEffect(() => {
    const fetchPastPapers = async (examinationId) => {
      try {
        const response = await axios.get(`/pastPapers/examination/${examinationId}`);
        setPastPaper(response.data);
      } catch (error) {
        console.error("Failed to fetch past papers:", error);
      }
    };
  
    fetchPastPapers(examinationId); // Make sure examinationId is defined and passed correctly
  }, []);
  return (
    <div style={{ diplay: "flex", flexDirection: "column" }}>
      <div className="middle-contaier" style={{ display: "flex" }}>
        <SideBar />
        <div className="mainContainer">
          <Navbar />
          <div className="read-crumb">
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>
                <a href="/examinations">{t("Examinations")}</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>{t("Past Papers")}</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </div>
          <h5>{t("Past Papers")}</h5>
          <section className="past-papers-section">
            {pastPaper.map((pastPaper, index) => (
              <Pdf key={index} link={pastPaper.pastPapersUrl} title={pastPaper.title} />
            ))}
          </section>
        </div>
      </div>
      <div className="footer" style={{ diplay: "flex" }}>
        <Footer />
      </div>
    </div>
  );
}

export default withAuth(PastPapers);

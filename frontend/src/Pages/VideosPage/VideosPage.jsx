import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import SideBar from "../../Components/SideBar/SideBar";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import { useTranslation } from "react-i18next";
import "./VideosPage.css";
import VideoCard from "../../Components/VideoCard/VideoCard";
import withAuth from "../../hoc/withAuth";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LockIcon from "../../Assets/lockIcon.png";

function VideosPage() {
  const { t } = useTranslation();
  const [videos, setVideos] = useState([]);
  const [isPremiumMember, setIsPremiumMember] = useState(false);
  const { examinationId } = useParams();
  const token = localStorage.getItem("AUTH_TOKEN");
  const user = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `/lectureVideos/examination/${examinationId}`,
          config
        );
        setVideos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const checkPremiumMembership = async () => {
      try {
        const response = await axios.get(`/auth/${user._id}`);
        setIsPremiumMember(response.data.user.isPremiumMember);
      } catch (error) {
        console.error(error);
      }
    };

    checkPremiumMembership();
    fetchVideos();
  }, [examinationId]);

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
              <MDBBreadcrumbItem active>
                {t("Lecture Videos")}
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </div>
          <h5>{t("Lecture Videos")}</h5>
          {isPremiumMember ? (
            <section className="video-section">
              {videos.map((video) => (
                <div className="col-md-4" key={video._id}>
                  <VideoCard
                    thumbnail={video.thumbnail}
                    title={video.title}
                    description={video.description}
                    videoUrl={video.videoUrl}
                  />
                </div>
              ))}
            </section>
          ) : (
            <div className="video-section blur-layer">
              <div className="premium-message">
                <img src={LockIcon} alt="Lock Icon" />
                <p>
                  <b>
                    {t(
                      "You need to be a premium member to access the lecture videos"
                    )}
                  </b>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="footer" style={{ diplay: "flex" }}>
        <Footer />
      </div>
    </div>
  );
}

export default withAuth(VideosPage);

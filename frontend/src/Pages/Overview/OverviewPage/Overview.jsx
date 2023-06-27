import React from "react";
import Sidebar from "../../../Components/SideBar/SideBar";
import Navbar from "../../../Components/Navbar/Navbar";
import "./Overview.css";
import MiddleSection from "../MiddleSection/MiddleSection";
import RightSection from "../../../Components/RightSection/RightSection";
import Footer from "../../../Components/Footer/Footer";
import { useTranslation } from "react-i18next";
import withAuth from "../../../hoc/withAuth";

function Overview() {
  const {t}=useTranslation();

  return (
    <div style={{ diplay: "flex", flexDirection: "column" }}>
      <div className="overview" style={{ display: "flex" }}>
        <Sidebar />
        <div className="mainContainer">
          <Navbar/>
          <h5>{t('Overview')}</h5>
          <div className="overviewSections" style={{ display: "flex" }}>
            <MiddleSection />
            <RightSection />
          </div>
        </div>
      </div>
      <div className="footer" style={{ diplay: "flex" }}>
        <Footer />
      </div>
    </div>
  );
}

export default withAuth(Overview);

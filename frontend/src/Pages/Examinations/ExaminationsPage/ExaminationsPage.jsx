import React from "react";
import "./ExaminationsPage.css";
import Sidebar from "../../../Components/SideBar/SideBar";
import Navbar from "../../../Components/Navbar/Navbar";
import ExaminationSection from "../ExaminationCardsSection/ExaminationCardsSection";
import Footer from '../../../Components/Footer/Footer'
import RightSection from "../../../Components/RightSection/RightSection";
import {
MDBBreadcrumb,
MDBBreadcrumbItem
} from 'mdb-react-ui-kit';
import { useTranslation } from "react-i18next";
import withAuth from "../../../hoc/withAuth";


function Examinations() {
  const { t } = useTranslation();

  return (
    <div style={{ diplay: 'flex', flexDirection: 'column' }}>
      <div className="middle-contaier" style={{ display: "flex" }}>
        <Sidebar />
        <div className="mainContainer">
          <Navbar/>
          <div className="read-crumb">
            <MDBBreadcrumb >
              <MDBBreadcrumbItem>
                <a href='/'>{t("Overview")}</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>{t("Examinations")}</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </div>
          <h5>{t("Examinations")}</h5>
          <div className="examinationSecation" style={{ display: 'flex' }}>
            <ExaminationSection />
            <RightSection />
          </div>
        </div>
      </div>
      <div className="footer" style={{ diplay: 'flex' }}>
        <Footer />
      </div>
    </div>
  );
}

export default withAuth(Examinations);

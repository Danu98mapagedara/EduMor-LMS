import React from 'react';
import { useTranslation } from 'react-i18next';
import SideBar from '../../../Components/SideBar/SideBar';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import { MDBBreadcrumb, MDBBreadcrumbItem } from 'mdb-react-ui-kit';
import VacancySection from '../VacancySection/VacancySection';
import withAuth from '../../../hoc/withAuth';


function VacanciesPage() {
    const { t } = useTranslation();
  return (
    <div style={{ diplay: 'flex', flexDirection: 'column' }}>
      <div className="middle-contaier" style={{ display: "flex" }}>
        <SideBar />
        <div className="mainContainer">
          <Navbar/>
          <div className="read-crumb">
            <MDBBreadcrumb >
              <MDBBreadcrumbItem>
                <a href='/'>{t("Overview")}</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>{t("Vacancy")}</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </div>
          <h5>{t("Vacancy")}</h5>
          <section >
            
           <VacancySection/>
          </section>
        </div>
      </div>
      <div className="footer" style={{ diplay: 'flex' }}>
        <Footer />
      </div>
    </div>
  )
}

export default withAuth(VacanciesPage);
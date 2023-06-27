import React from 'react'
import { useTranslation } from 'react-i18next';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import SideBar from '../../Components/SideBar/SideBar';
import {MDBBreadcrumb,MDBBreadcrumbItem} from 'mdb-react-ui-kit';
import BillingForm from '../../Components/BillingForm/BillingForm';
import withAuth from '../../hoc/withAuth';

function Payment() {

  const {t}=useTranslation();

  return (
    <div style={{ diplay: 'flex', flexDirection: 'column' }}>
      <div className="middle-contaier" style={{ display: "flex" }}>
        <SideBar />
        <div className="mainContainer">
          <Navbar />
          <div className="read-crumb">
            <MDBBreadcrumb >
              <MDBBreadcrumbItem>
                <a href='/'>{t("Overview")}</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>{t("Payments")}</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </div>
          <h5>{t("Payments")}</h5>
          <section>
          <BillingForm/>
          </section>
        </div>
      </div>
      <div className="footer" style={{ diplay: 'flex' }}>
        <Footer />
      </div>
    </div>
  )
}

export default withAuth(Payment);
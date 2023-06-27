import React from "react";
import AdminNavbar from "../../../../Components/Admin/AdminNavbar/AdminNavbar";
import MiniCalander from "../../../../Components/MiniCalander/MiniCalander";
import AdminSideBar from "../../../../Components/Admin/AdminSideBar/AdminSideBar";
import Footer from "../../../../Components/Footer/Footer";
import PaymentsData from "../PaymentsData/PaymentsData";

function Paymentpage() {
  return (
    <div style={{ diplay: "flex", flexDirection: "column" }}>
      <div className="overview" style={{ display: "flex", width: "100%" }}>
        <AdminSideBar />
        <div className="mainContainer">
          <AdminNavbar />
          <h5
            style={{
              color: "#041083",
              fontweight: "bold",
              marginBottom: "2px",
              marginTop: "-50px",
            }}
          >
            Payment Details
          </h5>
          <div
            className="overviewSections"
            style={{ display: "flex", minWidth: "100%" }}
          >
            <div
              className="middle-section"
              style={{ display: "flex", flexDirection: "column", width: "75%" }}
            >
              <PaymentsData />
            </div>

            <div className="right-section" style={{ width:"15%", marginTop:'150px'}}>
              <MiniCalander />
            </div>
          </div>
        </div>
      </div>
      <div className="footer" style={{ diplay: "flex" }}>
        <Footer />
      </div>
    </div>
  );
}

export default Paymentpage;

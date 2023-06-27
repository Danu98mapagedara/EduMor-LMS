import React from "react";
import AdminNavbar from "../../../../Components/Admin/AdminNavbar/AdminNavbar";
import MiniCalander from "../../../../Components/MiniCalander/MiniCalander";
import UserData from "../UserData/UserData";
import AdminSideBar from "../../../../Components/Admin/AdminSideBar/AdminSideBar"
import Footer from "../../../../Components/Footer/Footer";
import withAuth from "../../../../hoc/withAuth";


function UserdetailsPage() {
  return (
    <div style={{ diplay: "flex", flexDirection: "column" }}>
      <div className="overview" style={{ display: "flex", width:"100%"}}>
        < AdminSideBar/>
        <div className="mainContainer">
          <AdminNavbar />
          <h5 style={{color:'#041083',marginBottom:'30px', marginTop:"-50px", fontSize:'20px'}}>User Details</h5>

          <div className="overviewSections" style={{ display: "flex",color:'black', minWidth:"100%" }}>

            <div className="middle-section" style={{ display: "flex",flexDirection: "column", width:"75%"}}>
              <UserData/>
            </div>

            <div className="right-section" style={{ width:"15%", marginTop:'150px'}}>
              <MiniCalander />
            </div>

          </div>

        </div>

      </div>
      <div className="footer" style={{ diplay: "flex" }}>
        <Footer/>
      </div>
    </div>
  );
}

export default withAuth(UserdetailsPage);

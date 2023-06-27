import React from "react";
import AdminNavbar from "../../../Components/Admin/AdminNavbar/AdminNavbar";
import MiniCalander from "../../../Components/MiniCalander/MiniCalander";
import AdminSideBar from "../../../Components/Admin/AdminSideBar/AdminSideBar"
import Footer from "../../../Components/Footer/Footer";
import  NewsTable from "./NewsTable"
import News from "./News";


function NewsPage() {
  return (
    <div style={{ diplay: "flex", flexDirection: "column" }}>
      <div className="overview" style={{ display: "flex", width:"100%"}}>
        < AdminSideBar/>
        <div className="mainContainer">
          <AdminNavbar />
          <h5 style={{color:'#041083',fontWeight:'bold', marginTop:'-50px'}}>News  Upload </h5>
          <div className="overviewSections" style={{ display: "flex" }}>
            <div className="middle-section" style={{ display: "flex",flexDirection: "column",width:"75%"}}>
             <News/>
             <NewsTable/>
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

export default NewsPage;
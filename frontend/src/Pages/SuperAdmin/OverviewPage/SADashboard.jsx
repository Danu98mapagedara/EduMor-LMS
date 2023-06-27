import React from 'react'
import Footer from '../../../Components/Footer/Footer'
import SANavbar from '../../../Components/SuperAdmin/SANavbar/SANavbar'
import SAOverview from './SAOverview/SAOverview'
import SASidebar from '../../../Components/SuperAdmin/SASidebar/SASidebar'

function SADashboard() {
  return (
    <div style={{ diplay: "flex", flexDirection: "column" }}>
      <div className="overview" style={{ display: "flex" }}>
        <SASidebar />
        <div className="mainContainer">
          <SANavbar />
          <div className="overview-container" style={{ display: "flex" }}>
            <SAOverview />
          </div>
        </div>
      </div>
      <div className="footer" style={{ diplay: "flex" }}>
        <Footer />
      </div>
    </div>
  )
}

export default SADashboard
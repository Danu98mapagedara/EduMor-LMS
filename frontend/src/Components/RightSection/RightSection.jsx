import React from 'react'
import MiniCalendar from '../MiniCalander/MiniCalander'
import './RightSection.css'
import Ads from '../Ads/Ads'

function RightSection() {
  return (
    <div className="rightSection" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="vaccancy">
        <Ads/>
      </div>
      <div className="calander" >
        <MiniCalendar />
      </div>
    </div>
  )
}

export default RightSection
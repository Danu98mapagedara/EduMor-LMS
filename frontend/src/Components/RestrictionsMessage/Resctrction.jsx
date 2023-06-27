import React from 'react'
import './Restriction.css'

// quiz Restriction
export function QuizRestriction() {
    return (
        <div className='res'>
        <font className="res-btn">Restricted</font>
        <font className="res-msg">Not available unless: Previous level is completed</font>
        </div>
    );
  }
  
  // video Restriction
  export function VideoRestriction() {
    return (
        <div className='res'>
        <font className="res-btn">Restricted</font>
        <font className="res-msg">Not available unless: Premium Subscription is purchased</font>
        </div>
    );
  }
  
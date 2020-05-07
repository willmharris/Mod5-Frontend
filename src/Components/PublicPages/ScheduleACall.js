import React from 'react'
import {NavLink} from 'react-router-dom'
import Calender from './Calender'

function ScheduleACall() {
    
    
    
    return(
        <div>
            <p>Would you like to schedule a time to chat?</p>
            <Calender />
            <a href="https://calendly.com/willmharris0/consultation-call" ><button>Schedule a call</button></a>
            <NavLink  to="/" ><button>Return to homepage</button></NavLink>
            
        </div>
    )
}

export default ScheduleACall
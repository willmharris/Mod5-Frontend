import React from 'react'

function LeadDisplay(props) {
    return(
        <div>
            {props.currentLead ? props.currentLead.first_name : null} {props.currentLead ? props.currentLead.last_name : null}
            <br />
            {props.currentLead ? props.currentLead.email : null}
        </div>
    )
}

export default LeadDisplay
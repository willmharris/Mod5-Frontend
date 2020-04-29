import React from 'react'

function LeadDisplay(props) {
    return(
        <div>
            {props.lead ? props.lead.first_name : null} {props.lead ? props.lead.last_name : null}
            <br />
            {props.lead ? props.lead.email : null}
        </div>
    )
}

export default LeadDisplay
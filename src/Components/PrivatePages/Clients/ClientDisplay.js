import React from 'react'
import { NavLink } from 'react-router-dom'

function ClientDisplay(props) {
    return(
        <div>
            {props.currentClient ? props.currentClient.first_name : null} {props.currentClient ? props.currentClient.last_name : null}
            <br />
            {props.currentClient ? props.currentClient.email : null}
            <br />
            Cases:
            <br />
            {props.currentClientCases ? 
                props.currentClientCases.map(theCase => <NavLink to={`/admin/cases/#${theCase.id}`}>{theCase.confirmed_location}</NavLink>) 
                : 
                null
            }
        </div>
    )
}

export default ClientDisplay
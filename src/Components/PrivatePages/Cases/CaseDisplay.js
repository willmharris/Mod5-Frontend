import React from 'react'
import { NavLink } from 'react-router-dom'

function CaseDisplay(props) {
    
    return(
        <div>
            {props.currentCase ? props.currentCase.confirmed_location : null} 
            <br />
            <br />
            Clients:
            <br />
            {props.currentCaseClients ? 
                props.currentCaseClients.map(client => <NavLink to={`/admin/clients/#${client.id}`}>{client.first_name} {client.last_name}</NavLink>) 
                : 
                null
            }
        </div>
    )
}

export default CaseDisplay
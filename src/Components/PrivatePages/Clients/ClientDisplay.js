import React from 'react'
import { NavLink } from 'react-router-dom'

function ClientDisplay(props) {
    return(
        <div>
            {props.currentClient ?
                <div>
                    {props.currentClient.first_name} {props.currentClient.last_name}
                    <br /> <br />
                    Email: {props.currentClient.email}
                    <br /> <br />
                    Phone number: {props.currentClient.phone_number}
                    <br /> <br />
                    Zip code: {props.currentClient.zip_code}
                    <br /> <br />
                    Cases:
                    <br /> <br />
                    {props.currentClientCases.map(theCase => <NavLink to={`/admin/cases/#${theCase.id}`}>{theCase.planned_location}</NavLink>) }
                </div>
                :
                null
            }
        </div>
    )
}

export default ClientDisplay
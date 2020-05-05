import React from 'react'
import { NavLink } from 'react-router-dom'

function ClientDisplay(props) {
    return(
        <div>
            {props.currentClient ?
                <div>
                    {props.currentClient.first_name} {props.currentClient.last_name}
                    <br />
                    Email: {props.currentClient.email}
                    <br />
                    Phone number: {props.currentClient.phone_number}
                    <br />
                    Zip code: {props.currentClient.zip_code}
                    <br />
                    Cases:
                    <br />
                    {props.currentClientCases.map(theCase => <NavLink to={`/admin/cases/#${theCase.id}`}>{theCase.confirmed_location}</NavLink>) }
                </div>
                :
                null
            }
        </div>
    )
}

export default ClientDisplay
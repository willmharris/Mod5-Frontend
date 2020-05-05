import React from 'react'
import { NavLink } from 'react-router-dom'

function CaseDisplay(props) {

    return(
        <div>
            {props.currentCase ?
                <div>
                    Status : {props.currentCase.active? "Active" : "Inactive"}
                    <br />
                    Planned date: {props.currentCase.planned_date ? props.currentCase.planned_date.substring(0, 10) : "None" }
                    <br />
                    Planned location: {props.currentCase.planned_location ? props.currentCase.planned_location : "None"}
                    <br />
                    Confirmed date: {props.currentCase.confirmed_date ? props.currentCase.confirmed_date.substring(0, 10) : "None" }
                    <br />
                    Confirmed location: {props.currentCase.confirmed_location ? props.currentCase.confirmed_location : "None"}
                    <br />
                    <br />
                    Clients:
                    <br />
                    {props.currentCaseClients ? 
                        props.currentCaseClients.map(client => {
                            let userCase = props.currentUserCases.filter(userCase => userCase.user_id === client.id)[0]
                            return(
                                <div> 
                                    <NavLink to={`/admin/clients/#${client.id}`}>{client.first_name} {client.last_name}</NavLink>
                                    <br />
                                    {userCase.planned_session_confirmed ? "Confirmed for next session" : "Not confirmed"}
                                    <br />
                                    {userCase.team_relationship}
                                    <br />
                                    <br />
                                </div>
                            )
                        }) 
                        : 
                        null
                    }
                </div>
                :
                null
            }
        </div>
    )
}

export default CaseDisplay
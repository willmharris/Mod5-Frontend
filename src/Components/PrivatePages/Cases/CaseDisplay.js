import React from 'react'

function CaseDisplay(props) {
    
    return(
        <div>
            {props.currentCase ? props.currentCase.confirmed_location : null} 
            <br />
            <br />
            Clients:
            <br />
            {props.currentCaseClients ? 
                props.currentCaseClients.map(client => <div>{client.first_name} {client.last_name}</div>) 
                : 
                null
            }
        </div>
    )
}

export default CaseDisplay